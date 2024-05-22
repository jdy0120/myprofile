import _ from "lodash";
import { createFilePath } from "gatsby-source-filesystem";
import type { GatsbyNode } from "gatsby";
import path from "path";

const gql = String.raw;

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}: any) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/Post.tsx`);
  const seriesTemplate = path.resolve(`./src/templates/Series.tsx`);

  const result = await graphql(gql`
    {
      postsRemark: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            series
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.postsRemark.nodes;
  const series = _.reduce(
    posts,
    (acc: any, cur) => {
      const seriesName = cur.frontmatter.series;
      if (seriesName && !_.includes(acc, seriesName))
        return [...acc, seriesName];
      return acc;
    },
    []
  );

  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `/blog${post.fields.slug}`,
        component: postTemplate,
        context: {
          id: post.id,
          series: post.frontmatter.series,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  if (series.length > 0) {
    series.forEach((singleSeries: any) => {
      const path = `/series/${_.replace(singleSeries, /\s/g, "-")}`;
      createPage({
        path,
        component: seriesTemplate,
        context: {
          series: singleSeries,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const newSlug = `/${slug.split("/").reverse()[1]}/`;

    createNodeField({
      node,
      name: `slug`,
      value: newSlug,
    });
  }
};

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions;
  const typeDefs = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter!
  }
  type Frontmatter {
    title: String!
    description: String
    tags: [String!]!
    series: String
  }
  `;
  createTypes(typeDefs);
};

export { createPages };
