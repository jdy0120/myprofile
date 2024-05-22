import React from "react";
import styled from "styled-components";

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  max-width: 680px;
`;
interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

export default Body;
