import { Divider } from "@nextui-org/react";
import CreatePostForm from "@/components/posts/post-create-form";
import { db } from "@/db";
import { notFound } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicDetailsProps {
  params: {
    slug: string;
  };
}

export default async function TopicDetailsPage({ params }: TopicDetailsProps) {
  const topic = await db.topic.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!topic) {
    return notFound();
  }

  return (
    <div className="w-full h-full grid grid-cols-1 auto-rows-auto gap-y-4 md:grid-cols-4 md:gap-x-4 content-start">
      <div className="col-span-3">
        <h1 className="text-2xl mb-2">{topic.slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(topic.slug)} />
      </div>
      <div className="col-span-1 shadow border p-4 flex flex-col gap-4 h-fit">
        <CreatePostForm topicSlug={params.slug} />
        <Divider />
        <div className="min-h-60 max-h-96 overflow-auto">
          <h2 className="font-bold text-xl flex items-center justify-center pb-2">
            {topic.slug}
          </h2>
          <p>{topic.description}</p>
        </div>
      </div>
    </div>
  );
}
