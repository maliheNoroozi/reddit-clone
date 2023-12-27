"use server";

import { revalidatePath } from "next/cache";
import path from "@/path";

export async function createPost() {
  // revalidatePath(path.topicShow(slug))
}
