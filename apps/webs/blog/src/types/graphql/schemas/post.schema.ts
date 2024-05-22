interface PostEdgeType {
  title: string;
  body: string;
  _updatedAt: string;
  category: {
    title: string;
  };
  slug: {
    current: string;
  };
  tags: {
    title: string;
    posts: {
      slug: {
        current: string;
      };
    }[];
  }[];
}

interface TagNodeType {
  title: string;
  posts: {
    slug: {
      current: string;
    };
  }[];
}

interface QraphQlBlogIndexResponse {
  allSanityTag: {
    nodes: TagNodeType[];
  };
  allSanityPost: {
    totalCount: number;
    nodes: PostEdgeType[];
  };
}

export type { QraphQlBlogIndexResponse };
