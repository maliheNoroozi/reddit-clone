import type { Post } from "@prisma/client";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: Post["id"];
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-xl">{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
