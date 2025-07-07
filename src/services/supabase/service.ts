import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://hnfvvhglaawcuerxyysp.supabase.co";
const supabaseKey: string = process.env.SUPABASE_KEY ?? "";
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY environment variable is not set.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface UploadPhotoEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export const uploadPhoto = async (e: UploadPhotoEvent): Promise<void> => {
  const avatarFile = e.target.files?.[0];
  if (!avatarFile) return;

  const filePath = `public/${crypto.randomUUID()}-${avatarFile.name}`;

  const { error } = await supabase.storage
    .from("user-photos")
    .upload(filePath, avatarFile);

  if (error) {
    console.error("Upload failed", error);
    return;
  }

  const { data: urlData } = supabase.storage
    .from("user-photos")
    .getPublicUrl(filePath);

  console.log("Uploaded URL:", urlData.publicUrl);
};
