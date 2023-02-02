import { TGridItemProps } from "@/types/gridItem";

export const GridItem = ({ children, ...otherProps }: TGridItemProps) => {
  return <div {...otherProps}>{children}</div>;
};
