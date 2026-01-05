import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { env } from '@/env';

interface UploadToLocalArgs {
  path: string;
  file: Buffer;
}

export async function uploadToLocal({
  file,
  path,
}: UploadToLocalArgs) {
  try {
    // Create the full path in the public directory
    const publicDir = join(process.cwd(), 'public');
    const fullPath = join(publicDir, path);
    
    // Create directory if it doesn't exist
    const dir = join(fullPath, '..');
    await mkdir(dir, { recursive: true });
    
    // Write the file
    await writeFile(fullPath, file);
    
    return { path };
  } catch (error: unknown) {
    console.error('Local upload error:', error);
    throw new Error(`Failed to upload file locally: ${path}. Error: ${error}`);
  }
}