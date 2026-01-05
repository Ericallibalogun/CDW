import { z } from "zod";

export const SingleImageSchema = z.object({
	image: z.string().url(),
});

export type SingleImageType = z.infer<typeof SingleImageSchema>;

// Simple validation for file upload - we'll validate the file in the API route
export const SingleImageUploadSchema = z.object({
	file: z.any(), // We'll validate this is a File object in the API route
});

export const InitialiseMultipartUploadSchema = z.object({
	name: z.string(),
	uuid: z.string(),
});

export const GetMultipartUploadSchema = z.object({
	fileKey: z.string(),
	fileId: z.string(),
	parts: z.number(),
});

export const FinaliseMultipartUploadSchema = z.object({
	fileKey: z.string(),
	fileId: z.string(),
	parts: z.array(z.object({ PartNumber: z.number(), ETag: z.string() })),
});
