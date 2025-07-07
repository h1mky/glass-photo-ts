import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://hnfvvhglaawcuerxyysp.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY environment variable is not set.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadPhoto(file: File): Promise<string | undefined> {
  const filePath = `${crypto.randomUUID()}-${encodeURIComponent(file.name)}`;

  const { error } = await supabase.storage
    .from("user-photos")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    return;
  }

  const { data } = supabase.storage.from("user-photos").getPublicUrl(filePath);

  if (!data?.publicUrl) {
    console.error("Failed to get public URL");
    return;
  }

  return data.publicUrl;
}
