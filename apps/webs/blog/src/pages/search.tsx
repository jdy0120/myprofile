import React, { useState, useCallback } from "react";
import styled from "styled-components";
import SEO from "../_components/b_mocules/SEO";
import { graphql } from "gatsby";

import Layout from "../_components/c_organisms/layout";
import PostList from "../_components/b_mocules/postlist";
import TextField from "../_components/a_atoms/TextField";
import Title from "../_components/a_atoms/Title";
import VerticalSpace from "../_components/a_atoms/VerticalSpace";

import blogConfigs from "../configs/blog-config";

const { title, description, siteUrl } = blogConfigs;

const SearchWrapper = styled.div`
  margin-top: 20px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const Search = ({ data }: any) => {
  const posts = data.allMarkdownRemark.nodes;

  const [query, setQuery] = useState("");

  const filteredPosts = useCallback(
    posts.filter((post: any) => {
      const { frontmatter, rawMarkdownBody } = post;
      const { title } = frontmatter;
      const lowerQuery = query.toLocaleLowerCase();

      if (rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery))
        return true;

      return title.toLocaleLowerCase().includes(lowerQuery);
    }),
    [query]
  );

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <SearchWrapper>
        <Title size="sm">
          There are {filteredPosts.length} post
          {filteredPosts.length > 1 && "s"}.
        </Title>
        <TextField
          onChange={(e: any) => setQuery(e.target.value)}
          placeholder="Search"
        />
      </SearchWrapper>
      <VerticalSpace size={70} />
      <PostList postList={filteredPosts} />
    </Layout>
  );
};

export default Search;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
        rawMarkdownBody
      }
    }
  }
`;
