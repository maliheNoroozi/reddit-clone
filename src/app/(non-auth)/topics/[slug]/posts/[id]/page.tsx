import PostShow from "@/components/posts/post-show";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import Link from "next/link";
import path from "@/path";

interface PostShowProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function PostShowPage({ params }: PostShowProps) {
  const { id: postId, slug: topicSlug } = params;

  return (
    <div className="w-full">
      <Link href={path.topicShow(topicSlug)} className="underline">
        {`< Back to ${topicSlug}`}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
