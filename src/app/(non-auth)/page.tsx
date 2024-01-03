import PostList from "@/components/posts/post-list";
import CreateTopicForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Divider } from "@nextui-org/react";
import { fetchPosts } from "@/db/queries/posts";

export default async function Home() {
  return (
    <div className="w-full h-full grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-2xl mb-2">Top Posts</h1>
        <PostList fetchData={fetchPosts} />
      </div>
      <div className="shadow border px-2 pt-2 flex flex-col gap-2 h-80">
        <CreateTopicForm />
        <Divider />
        <TopicList />
      </div>
    </div>
  );
}
