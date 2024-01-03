import CommentListItem from "./comment-list-item";
import type { CommentProps } from "@/db/queries/comments";

interface CommentListProps {
  fetchData: () => Promise<CommentProps[]>;
}
export default async function CommentList({ fetchData }: CommentListProps) {
  const comments = await fetchData();
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
              comments={comments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
