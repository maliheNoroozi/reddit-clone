"use server";

import { revalidatePath } from "next/cache";
import path from "@/path";

export async function createComment() {
  // revalidatePath(path.postShow(slug, post.id))
}
