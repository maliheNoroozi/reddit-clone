import type { Comment, User, Post } from "@prisma/client";
import { db } from "@/db";

export type CommentProps = Comment & {
  user: Pick<User, "name" | "image">;
};

export const fetchCommentsByPostId = async (
  postId: Post["id"]
): Promise<CommentProps[]> => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return comments;
};
