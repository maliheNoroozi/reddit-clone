import { Skeleton } from "@nextui-org/react";

export default function PostShowLoading() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div>
        <Skeleton className="h-7 w-64" />
      </div>
      <div className="border border-gray-300 rounded p-4 flex flex-col gap-1">
        <Skeleton className="h-7 w-10/12" />
        <Skeleton className="h-7 w-8/12" />
      </div>
    </div>
  );
}
