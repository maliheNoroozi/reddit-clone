import Link from "next/link";
import type { PostProps } from "@/db/queries/posts";
import path from "@/path";

interface PostListItemProps {
  post: PostProps;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <div key={post.id} className="border rounded p-2">
      <Link href={path.postShow(post.topic.slug, post.id)}>
        <h3 className="text-lg font-bold">{post.title}</h3>
        <div className="flex flex-row gap-8">
          <p className="text-xs text-gray-400">By {post.user.name}</p>
          <p className="text-xs text-gray-400">
            {post._count.comments} comments
          </p>
        </div>
      </Link>
    </div>
  );
}
