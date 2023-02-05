import { useFirebaseDataContext } from "@/contexts/firebase/firebaseDataContext";
import { TGridItemProps } from "@/types/gridItem";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export const GridItem = ({
  index,
  isAvailable,
  children,
  ...otherProps
}: TGridItemProps) => {
  const { handleSetData } = useFirebaseDataContext();
  const [cardAvailable, setCardAvailable] = useState<boolean>(isAvailable);

  useEffect(() => {
    setCardAvailable(isAvailable);
  }, [isAvailable]);

  const handleClick = () => {
    handleSetData({ id: index, available: false, value: 0 });
  };

  return (
    <div {...otherProps} onClick={handleClick}>
      {children}
      <Overlay width="200" height="200" isAvailable={cardAvailable} />
    </div>
  );
};

const Overlay = styled.canvas<{ isAvailable: boolean }>`
  ${({ isAvailable }) =>
    !isAvailable &&
    css`
      display: none;
    `}
`;
