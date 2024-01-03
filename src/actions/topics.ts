"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Topic } from "@prisma/client";
import { nextAuthOptions } from "@/auth";
import { db } from "@/db";
import path from "@/path";

interface FormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

const topicScheme = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .regex(
      /^[a-z-]+$/,
      "Name must contain lowercase letters and dashes without space."
    ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

export async function createTopic(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validationResult = topicScheme.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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
        _form: ["You should be signed in to be able to create a topic."],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: validationResult.data.name,
        description: validationResult.data.description,
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
          _form: ["Something went wrong."],
        },
      };
    }
  }

  revalidatePath(path.home());
  redirect(path.topicShow(topic.slug));
}

export async function deleteTopic(id: string) {
  const topic = await db.topic.findFirst({
    where: {
      id,
    },
  });

  if (!topic) {
    throw new Error("Topic do not exist.");
  }

  await db.topic.delete({
    where: {
      id,
    },
  });
}
