import CommentCreateForm from "./comment-create-form";
import type { Comment } from "@prisma/client";
import Image from "next/image";
import type { CommentProps } from "@/db/queries/comments";

interface CommentListItemProps {
  commentId: Comment["id"];
  comments: CommentProps[];
}

export default function CommentListItem({
  commentId,
  comments,
}: CommentListItemProps) {
  const comment = comments.find((comment) => comment.id === commentId);
  if (!comment) {
    return null;
  }

  const filteredComments = comments.filter(
    (item) => item.parentId === commentId
  );

  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded p-2">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <span className="text-sm font-medium text-gray-500">
            {comment?.user.name}
          </span>
          <p className="text-gray-900">{comment.content}</p>
          <CommentCreateForm parentId={comment.id} postId={comment.postId} />
        </div>
      </div>
      {filteredComments.length > 0 && (
        <div className="pl-4 space-y-3">
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
