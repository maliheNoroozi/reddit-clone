import PostList from "@/components/posts/post-list";
import { searchPosts } from "@/db/queries/posts";
import { redirect } from "next/navigation";
import path from "@/path";

interface SearchProps {
  searchParams: {
    term: string;
  };
}

export default function SearchPage({ searchParams }: SearchProps) {
  const { term } = searchParams;

  if (!term || typeof term !== "string") {
    redirect(path.home());
  }

  return <PostList fetchData={() => searchPosts(term)} />;
}
