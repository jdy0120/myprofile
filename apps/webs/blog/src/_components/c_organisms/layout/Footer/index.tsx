import React from "react";
import styled from "styled-components";

import blogConfigs from "../../../../configs/blog-config";

const FooterWrapper = styled.footer`
  margin-top: 32px;
  padding: 40px 0;
  border-top: 1px solid ${(props) => props.theme.colors.divider};
  text-align: center;
  font-size: 11pt;
  font-weight: lighter;
  color: ${(props) => props.theme.colors.secondaryText};

  & > a {
    color: ${(props) => props.theme.colors.text};
  }
`;

const Footer = () => {
  const { title } = blogConfigs;
  return (
    <FooterWrapper>
      © {title}, Built with Gatsby and{" "}
      <a href="https://github.com/jdy0120/myprofile" target="blank">
        transform typescript
      </a>{" "}
      by doyeon
    </FooterWrapper>
  );
};

export default Footer;
