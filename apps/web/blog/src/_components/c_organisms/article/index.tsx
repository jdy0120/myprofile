import React from "react";

import Header from "./Header";
import Series from "./Series";
import Body from "./Body";
import Footer from "./Footer";

interface ArticleProps {
  children: React.ReactNode;
}

const Article = ({ children }: ArticleProps) => {
  return <>{children}</>;
};

Article.Header = Header;
Article.Series = Series;
Article.Body = Body;
Article.Footer = Footer;

export default Article;
