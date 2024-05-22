import styled from "styled-components";

interface DividerProps {
  mt?: string;
  mb?: string;
}

const Divider = styled.hr<DividerProps>`
  margin-top: ${(props) => props.mt};
  margin-bottom: ${(props) => props.mb};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
`;

Divider.defaultProps = {
  mt: "48px",
  mb: "48px",
};

export default Divider;
