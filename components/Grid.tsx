import { TGridProps } from "@/types/grid";

export const Grid = ({ children, ...otherProps }: TGridProps) => {
  return <div {...otherProps}>{children}</div>;
};
