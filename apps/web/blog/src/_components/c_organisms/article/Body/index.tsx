import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useOffsetTop from "../../../../hooks/useOffsetTop";

import Toc from "./Toc";
import StyledMarkdown from "./StyledMarkdown";
import PrismTheme from "./PrismTheme";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 112px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

interface BodyProps {
  html: string;
}

const Body = ({ html }: BodyProps) => {
  const [toc, setToc] = useState([]);

  const [ref, offsetTop] = useOffsetTop();

  useEffect(() => {
    setToc(
      Array.from(
        document.querySelectorAll(
          "#article-body > h2, #article-body > h3"
        )
      )
    );
  }, []);

  return (
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop as number} />

      <PrismTheme />

      <StyledMarkdown
        ref={ref as React.LegacyRef<HTMLDivElement>}
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      />
    </Wrapper>
  );
};

export default Body;
