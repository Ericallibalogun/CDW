import { supabase } from "@/lib/supabase";
import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test bucket access
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to list buckets",
        details: bucketsError 
      }, { status: 500 });
    }

    // Check if our bucket exists
    const targetBucket = env.NEXT_PUBLIC_S3_BUCKET_NAME;
    const bucketExists = buckets?.some(bucket => bucket.name === targetBucket);

    // If bucket exists, try to list files
    let files = null;
    if (bucketExists) {
      const { data: fileList, error: filesError } = await supabase.storage
        .from(targetBucket)
        .list('', { limit: 5 });
      
      if (!filesError) {
        files = fileList;
      }
    }

    return NextResponse.json({ 
      success: true,
      buckets: buckets?.map(b => b.name),
      targetBucket,
      bucketExists,
      sampleFiles: files,
      supabaseUrl: 'https://tdxskwalibvxafuimnix.supabase.co'
    });
  } catch (error) {
    console.error("Supabase test error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}