interface TopicShowProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowProps) {
  return <div>Topic Show Page {params.slug}</div>;
}
