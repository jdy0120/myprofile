import React from "react";
import { Helmet } from "react-helmet";
import blogConfigs from "../../../configs/blog-config";

interface Props {
  title: string;
  description: string;
  url: string;
}

const SEO = ({ title, description, url }: Props) => {
  const { siteUrl } = blogConfigs;
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      {description && (
        <meta name="description" content={description} />
      )}
      {description && (
        <meta property="og:description" content={description} />
      )}
    </Helmet>
  );
};

export default SEO;
