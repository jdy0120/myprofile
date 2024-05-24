import React, { useState, useEffect } from "react";
import _, { filter } from "lodash";
import styled from "styled-components";
import SEO from "../_components/b_mocules/SEO";

import { graphql, navigate } from "gatsby";

import queryString from "query-string";

import Layout from "../_components/c_organisms/layout";
import Title from "../_components/a_atoms/Title";
import TagList from "../_components/a_atoms/TagList";
import PostList from "../_components/b_mocules/postlist";
import VerticalSpace from "../_components/a_atoms/VerticalSpace";

import blogConfigs from "../configs/blog-config";

const { title, description, siteUrl } = blogConfigs;

const TagListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const TagsPage = ({ data }: any) => {
  const tags = _.sortBy(data.allMarkdownRemark.group, [
    "totalCount",
  ]).reverse();
  const posts = data.allMarkdownRemark.nodes;

  const [selected, setSelected] = useState<string>();
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

  let query = null;
  if (typeof document !== "undefined") {
    query = document.location.search;
  }

  useEffect(() => {
    if (!selected) {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(
      filter(
        posts,
        (post: any) => post.frontmatter.tags.indexOf(selected) !== -1
      )
    );
  }, [selected]);

  useEffect(() => {
    const q = queryString.parse(query as string)["q"];
    setSelected(q as string);
  }, [query]);

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <TagListWrapper>
        {selected ? (
          <Title size="sm">
            There are {filteredPosts.length} post
            {filteredPosts.length > 1 && "s"} that match #{selected}.
          </Title>
        ) : (
          <Title size="sm">
            There are {tags.length} tag{tags.length > 1 && "s"}.
          </Title>
        )}

        <TagList
          count
          tagList={tags}
          selected={selected}
          onClick={(tag) => {
            console.log(tag, selected);
            if (tag === selected) {
              navigate("/tags");
              alert("zz");
            } else setSelected(tag);
          }}
        />
      </TagListWrapper>

      <VerticalSpace size={32} />

      <PostList postList={filteredPosts} />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`;
