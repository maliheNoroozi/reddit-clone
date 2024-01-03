import { db } from "@/db";
import Link from "next/link";
import path from "@/path";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="min-h-[15rem] max-h-96 overflow-auto">
      <h2 className="font-bold text-xl flex items-center justify-center pb-2">
        Topics
      </h2>
      <ul>
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="p-2 hover:bg-[#dfe7e8] hover:p-2 hover:rounded"
          >
            <Link href={path.topicShow(topic.slug)} className="block">
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
