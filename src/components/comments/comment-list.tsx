import type { Post } from "@prisma/client";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import CommentListItem from "./comment-list-item";

interface CommentListProps {
  postId: Post["id"];
}
export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);
  const filteredComments = comments.filter((item) => item.parentId === null);

  return (
    <div className="space-y-2 mt-8">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {filteredComments.length > 0 && (
        <div className="space-y-3">
          {filteredComments.map((item) => (
            <CommentListItem
              key={item.id}
              commentId={item.id}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
