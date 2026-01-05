import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET() {
  try {
    // Test the environment variables
    const config = {
      S3_BUCKET_ACCESS_KEY: env.S3_BUCKET_ACCESS_KEY ? "✅ Set" : "❌ Missing",
      S3_BUCKET_SECRET_KEY: env.S3_BUCKET_SECRET_KEY ? "✅ Set" : "❌ Missing", 
      NEXT_PUBLIC_S3_BUCKET_REGION: env.NEXT_PUBLIC_S3_BUCKET_REGION,
      NEXT_PUBLIC_S3_BUCKET_NAME: env.NEXT_PUBLIC_S3_BUCKET_NAME,
      NEXT_PUBLIC_S3_URL: env.NEXT_PUBLIC_S3_URL,
    };

    return NextResponse.json({ 
      success: true, 
      message: "Upload configuration test",
      config 
    });
  } catch (error) {
    console.error("Config test error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}