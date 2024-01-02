"use client";

import {
  Input,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import FormPrimaryButton from "../Buttons/form-primary-button";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

interface CreatePostFormProps {
  topicSlug: string;
}

export default function CreatePostForm({ topicSlug }: CreatePostFormProps) {
  const [formState, formAction] = useFormState(
    actions.createPost.bind(null, topicSlug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          variant="solid"
          type="button"
          className="bg-[#17888F] text-white font-bold px-8 py-2 rounded self-center"
        >
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction}>
          <div className="flex flex-col gap-4 w-96 px-4 py-8">
            <h1 className="font-bold text-xl">Create a Post</h1>
            <Input
              variant="flat"
              radius="sm"
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              variant="flat"
              radius="sm"
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="text-red-600">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormPrimaryButton>Create</FormPrimaryButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
