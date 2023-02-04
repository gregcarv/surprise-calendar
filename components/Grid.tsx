import { TGridProps } from "@/types/grid";
import { GridItem } from "./GridItem";
import styled from "@emotion/styled";

export const Grid = ({ numItems, ...otherProps }: TGridProps) => {
  let GridItems = [];

  for (let i = 1; i <= numItems; i++) {
    GridItems.push(<GridItem key={`item-${i}`}>{i}</GridItem>);
  }

  return <GridRoot {...otherProps}>{GridItems}</GridRoot>;
};

const GridRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  grid-auto-rows: 5rem;
  gap: 0.1rem;
`;
