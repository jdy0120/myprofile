import React from "react";
import {
  flow,
  map,
  groupBy,
  sortBy,
  filter,
  reverse,
} from "lodash/fp";
import styled from "styled-components";
import SEO from "../_components/b_mocules/SEO";

import { graphql } from "gatsby";

import Layout from "../_components/c_organisms/layout";
import Title from "../_components/a_atoms/Title";
import SeriesList from "../_components/b_mocules/SeriesList";
import VerticalSpace from "../_components/a_atoms/VerticalSpace";
import NoContent from "../_components/c_organisms/nocontent";

import blogConfigs from "../configs/blog-config";

const { title, description, siteUrl } = blogConfigs;

const TagListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SeriesPage = ({ data }: any) => {
  const posts = data.allMarkdownRemark.nodes;
  const series = flow(
    map((post: any) => ({
      ...post.frontmatter,
      slug: post.fields.slug,
    })),
    groupBy("series"),
    map((series: any) => ({
      name: series[0].series,
      posts: series,
      lastUpdated: series[0].date,
    })),
    sortBy((series) => new Date(series.lastUpdated)),
    filter((series) => series.name),
    reverse
  )(posts);

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <TagListWrapper>
        {series.length > 0 && (
          <Title size="sm">There are {series.length} series.</Title>
        )}
      </TagListWrapper>

      {series.length === 0 && <NoContent name="series" />}

      <VerticalSpace size={32} />

      <SeriesList seriesList={series} />
    </Layout>
  );
};

export default SeriesPage;

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
          series
        }
      }
    }
  }
`;
