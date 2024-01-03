const path = {
  home: () => "/",
  topicShow: (slug: string) => `/topics/${slug}`,
  postCreate: (slug: string) => `/topics/${slug}/posts/new`,
  postShow: (slug: string, id: string) => `/topics/${slug}/posts/${id}`,
  postSearch: (term: string) => `/search?term=${term}`,
};

export default path;
