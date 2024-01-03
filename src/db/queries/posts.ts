import type { Post, Topic, User } from "@prisma/client";
import { db } from "@/db";

export type PostProps = Post & {
  topic: { slug: Topic["slug"] };
} & {
  user: { name: User["name"] };
} & {
  _count: { comments: number };
};

export const fetchPostsByTopicSlug = async (
  slug: Topic["slug"]
): Promise<PostProps[]> => {
  return await db.post.findMany({
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
};

export const fetchTopPosts = async (): Promise<PostProps[]> => {
  return await db.post.findMany({
    take: 5,
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
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
};

export const searchPosts = async (term: string): Promise<PostProps[]> => {
  return await db.post.findMany({
    where: {
      OR: [
        {
          title: { contains: term },
        },
        {
          content: { contains: term },
        },
      ],
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
};
