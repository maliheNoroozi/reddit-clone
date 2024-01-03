import PostListItem from "@/components/posts/post-list-item";
import type { PostProps } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostProps[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <div className="space-y-3 w-full">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
