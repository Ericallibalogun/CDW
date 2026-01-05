"use server";

import {
	StreamableSkeleton,
	type StreamableSkeletonProps,
} from "@/components/admin/classifieds/streamable-skeleton";
import { env } from "@/env";
import { mapToTaxonomyOrCreate } from "@/lib/ai-utils";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
	type StreamableValue,
	createAI,
	createStreamableUI,
	createStreamableValue,
} from "ai/rsc";
import type { ReactNode } from "react";
import {
	ClassifiedDetailsAISchema,
	ClassifiedTaxonomyAISchema,
} from "../schemas/classified-ai.schema";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function generateClassified(
	image: string,
): Promise<ClientMessage | null> {
	const uiStream = createStreamableUI();
	const valueStream = createStreamableValue<StreamableSkeletonProps>();

	let classified = { image } as StreamableSkeletonProps;

	uiStream.update(<StreamableSkeleton {...classified} />);

	async function processEvents() {
		try {
			const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

			// Fetch the image from the URL and convert to base64
			let imageData: string;
			if (image.startsWith('data:image/')) {
				// Already base64
				imageData = image.replace(/^data:image\/[a-z]+;base64,/, "");
			} else {
				// It's a URL, fetch and convert to base64
				const response = await fetch(image);
				const buffer = await response.arrayBuffer();
				imageData = Buffer.from(buffer).toString('base64');
			}

			// Generate taxonomy
			const taxonomyPrompt = `You are an expert at analyzing images of vehicles. Based on the image provided, extract the following information in JSON format:
			{
				"year": number,
				"make": "string",
				"model": "string", 
				"modelVariant": "string or null"
			}
			
			Analyze the vehicle in the image and provide accurate year, make, model, and variant information.`;

			const taxonomyResult = await model.generateContent([
				taxonomyPrompt,
				{
					inlineData: {
						data: imageData,
						mimeType: "image/jpeg"
					}
				}
			]);

			const taxonomyText = taxonomyResult.response.text();
			const taxonomy = JSON.parse(taxonomyText.replace(/```json\n?|\n?```/g, ''));

			classified.title =
				`${taxonomy.year} ${taxonomy.make} ${taxonomy.model} ${taxonomy.modelVariant ? ` ${taxonomy.modelVariant}` : ""}`.trim();

			const foundTaxonomy = await mapToTaxonomyOrCreate({
				year: taxonomy.year,
				make: taxonomy.make,
				model: taxonomy.model,
				modelVariant: taxonomy.modelVariant,
			});

			if (foundTaxonomy) {
				const make = await prisma.make.findFirst({
					where: { name: foundTaxonomy.make },
				});

				if (make) {
					classified = {
						...classified,
						...foundTaxonomy,
						make,
						makeId: make.id,
					};
				}
			}

			uiStream.update(<StreamableSkeleton {...classified} />);

			// Generate details
			const detailsPrompt = `Based on the vehicle image provided (${classified.title}), extract the following information in JSON format:
			{
				"odometer": number,
				"doors": number,
				"seats": number,
				"isUlez": boolean,
				"transmission": "Manual" | "Automatic",
				"colour": "string",
				"fuelType": "Petrol" | "Diesel" | "Electric" | "Hybrid",
				"bodyType": "string",
				"driveType": "FWD" | "RWD" | "AWD",
				"vrm": "string or null"
			}
			
			Analyze the vehicle carefully and provide accurate estimates for these properties. If you cannot determine a value from the image, use reasonable defaults for that vehicle type.`;

			const detailsResult = await model.generateContent([
				detailsPrompt,
				{
					inlineData: {
						data: imageData,
						mimeType: "image/jpeg"
					}
				}
			]);

			const detailsText = detailsResult.response.text();
			const details = JSON.parse(detailsText.replace(/```json\n?|\n?```/g, ''));

			classified = {
				...classified,
				...details,
			};

			uiStream.update(<StreamableSkeleton done={true} {...classified} />);
			valueStream.update(classified);
			uiStream.done();
			valueStream.done();
		} catch (error) {
			console.error('Gemini AI Error:', error);
			// Fallback to basic classification without AI
			classified.title = "Vehicle Classification Failed";
			uiStream.update(<StreamableSkeleton done={true} {...classified} />);
			valueStream.update(classified);
			uiStream.done();
			valueStream.done();
		}
	}

	processEvents();

	return {
		id: Date.now(),
		display: uiStream.value,
		role: "assistant" as const,
		classified: valueStream.value,
	};
}

type ServerMessage = {
	id?: number;
	name?: string | undefined;
	role: "user" | "assistant" | "system";
	content: any;
};

export type ClientMessage = {
	id: number;
	role: "user" | "assistant";
	display: ReactNode;
	classified: StreamableValue<StreamableSkeletonProps>;
};

export const AI = createAI({
	initialUIState: [] as ClientMessage[],
	initialAIState: [] as ServerMessage[],
	actions: {
		generateClassified,
	},
});
