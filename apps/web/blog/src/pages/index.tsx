import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import Layout from "../_components/c_organisms/layout";
import SEO from "../_components/b_mocules/SEO";
import Bio from "../_components/a_atoms/Bio";
import PostList from "../_components/b_mocules/postlist";
import SideTagList from "../_components/b_mocules/SideTagList";
import Divider from "../_components/a_atoms/Divider";
import VerticalSpace from "../_components/a_atoms/VerticalSpace";

import blogConfigs from "../configs/blog-config";

const { title, description, siteUrl } = blogConfigs;

const BlogIndex = ({ data }: any) => {
  const posts = data.allMarkdownRemark.nodes;
  const tags = _.sortBy(data.allMarkdownRemark.group, [
    "totalCount",
  ]).reverse();

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to
        &quot;content/blog&quot; (or the directory you specified for
        the &quot;gatsby-source-filesystem&quot; plugin in
        gatsby-config.js).
      </p>
    );
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <Divider />
      <SideTagList tags={tags} postCount={posts.length} />
      <PostList postList={posts} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          description
          tags
        }
      }
      group(field: { frontmatter: { tags: SELECT } }) {
        totalCount
        fieldValue
      }
    }
  }
`;
