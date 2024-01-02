"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import {
  Input,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import FormPrimaryButton from "@/components/Buttons/form-primary-button";

export default function CreateTopicForm() {
  const [formState, formAction] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          variant="solid"
          type="button"
          className="bg-[#17888F] text-white font-bold px-8 py-2 rounded self-center"
        >
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction}>
          <div className="flex flex-col gap-4 w-96 px-4 py-8">
            <h1 className="font-bold text-xl">Create a Topic</h1>
            <Input
              variant="flat"
              radius="sm"
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              variant="flat"
              radius="sm"
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
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
