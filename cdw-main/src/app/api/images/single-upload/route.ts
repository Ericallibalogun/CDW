import { auth } from "@/auth";
import { MAX_IMAGE_SIZE } from "@/config/constants";
import { env } from "@/env";
import { uploadToLocal } from "@/lib/local-storage";
import { forbidden } from "next/navigation";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const maxDuration = 300;

export const POST = auth(async (req) => {
	if (!req.auth) forbidden();

	try {
		const formData = await req.formData();
		const file = formData.get("file");

		// Validate file exists and has the expected properties
		if (!file || typeof file === 'string') {
			return NextResponse.json({ message: "No file provided" }, { status: 400 });
		}

		// Type assertion since we know it's a File-like object from FormData
		const fileObj = file as any;
		
		if (!fileObj.name || !fileObj.size || typeof fileObj.arrayBuffer !== 'function') {
			return NextResponse.json({ message: "Invalid file object" }, { status: 400 });
		}

		const uuid = uuidv4();

		if (fileObj.size > MAX_IMAGE_SIZE) {
			return NextResponse.json({ message: "Invalid file size" }, { status: 400 });
		}

		const { default: mimetype } = await import("mime-types");

		const mime = mimetype.lookup(fileObj.name).toString();
		if (mime.match(/image\/(jpeg|jpg|png|webp)/) === null) {
			console.log("File is not an image");

			return NextResponse.json(
				{ message: `File type invalid ${mime}` },
				{ status: 400 },
			);
		}

		const decodedFileName = decodeURIComponent(decodeURIComponent(fileObj.name));
		const key = `uploads/${uuid}/${decodedFileName}`;

		const buffer = Buffer.from(await fileObj.arrayBuffer());
		await uploadToLocal({
			file: buffer,
			path: key,
		});
		
		// Return URL pointing to the local file
		const url = `${env.NEXT_PUBLIC_APP_URL}/${key}`;
		return NextResponse.json({ url }, { status: 200 });
	} catch (err) {
		console.log(`Error uploading file: ${err}`);
		if (err instanceof Error) {
			return NextResponse.json(
				{ message: `Error uploading file: ${err.message}` },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 },
		);
	}
});
