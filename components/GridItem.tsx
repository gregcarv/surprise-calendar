import { TGridItemProps } from "@/types/gridItem";
import styled from "@emotion/styled";

export const GridItem = ({ children, ...otherProps }: TGridItemProps) => {
  return <GridItemRoot {...otherProps}>{children}</GridItemRoot>;
};

const GridItemRoot = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: green;
`;
