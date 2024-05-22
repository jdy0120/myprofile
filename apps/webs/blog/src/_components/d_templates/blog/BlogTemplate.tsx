import React from "react";
import SEO from "../../b_mocules/SEO";
import VerticalSpace from "../../a_atoms/VerticalSpace";
import Bio from "../../a_atoms/Bio";
import Divider from "../../a_atoms/Divider";
import SideTagList from "../../b_mocules/SideTagList";
import PostList from "../../b_mocules/postlist";
import blogConfigs from "../../../configs/blog-config";
import Layout from "../../c_organisms/layout";

interface Props {
  children: React.ReactNode;
}

const BlogTemplate = ({ children }: Props) => {
  const { title, description, siteUrl } = blogConfigs;
  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <Divider />
      {children}
    </Layout>
  );
};

export default BlogTemplate;
