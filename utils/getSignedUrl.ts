import { createClient } from "./supabaseClient";


const supabase = createClient()

export const getSignedUrl = async (
  filePath: string,
): Promise<string | null> => {
  if (!filePath) return null;

  const { data, error } = await supabase.storage
    .from("Emma_images")
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    console.error('Error generating signed URL:', error.message);
    return null;
  }

  return data.signedUrl;
};
