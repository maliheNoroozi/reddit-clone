interface PostShowProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function PostShowPage({ params }: PostShowProps) {
  return <div>Post Show Page {params.slug}</div>;
}
