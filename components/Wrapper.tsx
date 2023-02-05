import { TWrapperProps } from "@/types/wrapper";
import styled from "@emotion/styled";

export const Wrapper = ({ children }: TWrapperProps) => {
  return <WrapperRoot>{children}</WrapperRoot>;
};

const WrapperRoot = styled.section`
  max-width: var(--max-width);
  margin: 1rem auto 2rem auto;
  padding: 0 2rem;
`;
