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
    <div className="w-full h-full grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-2xl mb-2">{topic.slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(topic.slug)} />
      </div>
      <div className="shadow border px-2 pt-2 flex flex-col gap-2 h-80">
        <CreatePostForm topicSlug={params.slug} />
        <Divider />
        <div>
          <h2 className="font-bold text-xl flex items-center justify-center pb-2">
            {topic.slug}
          </h2>
          <div>{topic.description}</div>
        </div>
      </div>
    </div>
  );
}
