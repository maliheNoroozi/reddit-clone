"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Comment, User } from "@prisma/client";
import { nextAuthOptions } from "@/auth";
import { db } from "@/db";
import path from "@/path";

interface FormState {
  success?: boolean;
  errors: {
    content?: string[];
    _form?: string[];
  };
}

const commentSchema = z.object({
  content: z.string().min(10),
});

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validationResult = commentSchema.safeParse({
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
        _form: ["You should be signed in to be able to create a comment."],
      },
    };
  }

  const user = session.user as User;

  let comment: Comment;
  try {
    comment = await db.comment.create({
      data: {
        content: validationResult.data.content,
        postId,
        parentId: parentId || null,
        userId: user.id,
      },
    });
  } catch (error) {
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

  const topic = await db.topic.findFirst({
    where: {
      posts: { some: { id: postId } },
    },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  revalidatePath(path.postShow(topic.slug, postId));
  return {
    success: true,
    errors: {},
  };
}
