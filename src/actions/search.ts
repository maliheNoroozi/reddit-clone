"use server";

import { redirect } from "next/navigation";
import path from "@/path";

export async function search(formData: FormData) {
  const term = formData.get("term");

  console.log(2, { term });

  if (!term || typeof term !== "string") {
    redirect(path.home());
  }

  redirect(path.postSearch(term));
}
