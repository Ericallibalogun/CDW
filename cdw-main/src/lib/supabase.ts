import { createClient } from '@supabase/supabase-js';
import { env } from '@/env';

// Extract the project URL from the storage URL
const supabaseUrl = 'https://tdxskwalibvxafuimnix.supabase.co';
const supabaseServiceKey = env.S3_BUCKET_SECRET_KEY; // This is the service role key

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

interface UploadToSupabaseArgs {
  bucketName: string;
  path: string;
  file: Buffer;
  mimetype: string;
}

export async function uploadToSupabase({
  bucketName,
  file,
  path,
  mimetype,
}: UploadToSupabaseArgs) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        contentType: mimetype,
        cacheControl: 'no-store',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    return data;
  } catch (error: unknown) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload file: ${path}. Error: ${error}`);
  }
}