import styled from "styled-components";

interface VerticalSpaceProps {
  size: number;
}

export default styled.div<VerticalSpaceProps>`
  height: ${(props) => props.size}px;
`;
