import PostListItem from "@/components/posts/post-list-item";
import type { PostProps } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostProps[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
