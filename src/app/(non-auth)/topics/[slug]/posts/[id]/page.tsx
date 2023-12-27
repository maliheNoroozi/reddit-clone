interface PostShowProps {
  params: {
    id: string;
  };
}

export default function PostShowPage({ params }: PostShowProps) {
  return <div>Post Show Page {params.id}</div>;
}
