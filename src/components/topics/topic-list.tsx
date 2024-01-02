import { db } from "@/db";
import Link from "next/link";
import path from "@/path";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="rounded h-80 overflow-hidden">
      <h2 className="font-bold text-xl flex items-center justify-center pb-2">
        Topics
      </h2>
      <ul className="list-none h-full overflow-y-auto">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="p-2 hover:bg-[#dfe7e8] hover:p-2 hover:rounded"
          >
            <Link href={path.topicShow(topic.slug)} className="w-full block">
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
