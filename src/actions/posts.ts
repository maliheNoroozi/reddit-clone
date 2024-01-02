"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import path from "@/path";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { Post, User } from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";

interface FormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
});

export async function createPost(
  topicSlug: string,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validationResult = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return {
      errors: {
        _form: [""],
      },
    };
  }

  const user = session.user as User;
  const topic = await db.topic.findFirst({ where: { slug: topicSlug } });

  if (!topic) {
    return {
      errors: {
        _form: ["Can not find topic."],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        ...validationResult.data,
        userId: user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(path.topicShow(topicSlug));
  redirect(path.postShow(topic.slug, post.id));
}
