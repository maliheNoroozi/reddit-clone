import PostList from "@/components/posts/post-list";
import CreateTopicForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Divider } from "@nextui-org/react";
import { fetchTopPosts } from "@/db/queries/posts";

export default async function Home() {
  return (
    <div className="w-full h-full grid grid-cols-1 auto-rows-auto gap-y-4 md:grid-cols-4 md:gap-x-4 content-start">
      <div className="col-span-3">
        <h1 className="text-2xl mb-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="col-span-1 shadow border p-4 flex flex-col gap-4 h-fit">
        <CreateTopicForm />
        <Divider />
        <TopicList />
      </div>
    </div>
  );
}
