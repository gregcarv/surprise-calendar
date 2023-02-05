import { useFirebaseDataContext } from "@/contexts/firebase/firebaseDataContext";
import { useScratchOff } from "@/hooks/useScratchOff";
import { TGridItemProps } from "@/types/gridItem";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

export const GridItem = ({
  data,
  clickedId,
  ...otherProps
}: TGridItemProps) => {
  const { handleSetData } = useFirebaseDataContext();
  const [cardAvailable, setCardAvailable] = useState<boolean>(data.available);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useScratchOff(canvasRef);

  useEffect(() => {
    setCardAvailable(data.available);
  }, [data]);

  const handleClick = () => {
    handleSetData({ id: data.id, available: false, value: data.value });
  };

  return (
    <div {...otherProps} onClick={handleClick} data-testid="grid-item">
      <span>{data.id}</span>
      {clickedId && clickedId === data.id ? (
        <strong>
          {data.value > 0
            ? `You win € ${data.value}!`
            : `Sorry. Try again next season.`}
        </strong>
      ) : null}
      <Overlay
        width="200"
        height="200"
        isAvailable={cardAvailable}
        ref={canvasRef}
      />
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
