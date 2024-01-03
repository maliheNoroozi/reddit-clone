import type { Post, Topic, User } from "@prisma/client";
import { db } from "@/db";

export type PostProps = Pick<Post, "id" | "title" | "content"> & {
  topic: { slug: Topic["slug"] };
} & {
  user: { name: User["name"] };
} & {
  _count: { comments: number };
};

export const fetchPostsByTopicSlug = async (
  slug: Topic["slug"]
): Promise<PostProps[]> => {
  const posts = await db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};

export const fetchPosts = async (): Promise<PostProps[]> => {
  const posts = await db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};
