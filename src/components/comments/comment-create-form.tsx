"use client";

import { Textarea, Button } from "@nextui-org/react";
import FormPrimaryButton from "../Buttons/form-primary-button";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import type { Post, Comment } from "@prisma/client";

interface CommentCreateFormProps {
  postId: Post["id"];
  parentId?: Comment["id"];
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showCommentCreateForm, setShowCommentCreateForm] = useState<
    boolean | undefined
  >(startOpen);

  const [formState, formAction] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    {
      errors: {},
    }
  );

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      if (!startOpen) {
        setShowCommentCreateForm(false);
      }
    }
  }, [formState.success]);

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="light"
        className="font-bold py-2 rounded self-start"
        onClick={() => setShowCommentCreateForm(true)}
      >
        Reply
      </Button>
      {showCommentCreateForm && (
        <form ref={formRef} action={formAction}>
          <div className="w-full flex flex-col gap-2">
            <Textarea
              radius="sm"
              name="content"
              placeholder="Enter your comment"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="text-red-600">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormPrimaryButton>Sava</FormPrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
}
