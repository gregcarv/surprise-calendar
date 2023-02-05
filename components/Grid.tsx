import { TGridProps } from "@/types/grid";
import { GridItem } from "./GridItem";
import styled from "@emotion/styled";
import { useFirebaseDataContext } from "@/contexts/firebase/firebaseDataContext";
import { css } from "@emotion/react";

export const Grid = ({ ...otherProps }: TGridProps) => {
  const { data, cardClicked } = useFirebaseDataContext();

  return (
    <GridRoot {...otherProps} cardClicked={cardClicked}>
      {(data || []).map((card) => {
        return (
          <GridItem
            index={card.id}
            key={`item-${card.id}`}
            isAvailable={card.available}
          >
            {card.id}
          </GridItem>
        );
      })}
    </GridRoot>
  );
};

const GridRoot = styled.div<{ cardClicked: boolean }>`
  --columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(5rem, 1fr));
  gap: 0;
  background: url("/kitty_optimized.jpg") no-repeat center/cover fixed;

  @media (min-width: 540px) {
    --columns: 4;
  }

  @media (min-width: 768px) {
    --columns: 5;
  }

  @media (min-width: 1024px) {
    --columns: 8;
  }

  @media (min-width: 1200px) {
    --columns: 10;
  }

  > div {
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
    font-size: 1rem;
    aspect-ratio: 1/1;
    border: 1px solid #000000;
    ${({ cardClicked }) =>
      cardClicked &&
      css`
        cursor: not-allowed;
      `}

    > canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      text-align: center;
      background-color: green;
      cursor: grabbing;
      ${({ cardClicked }) =>
        cardClicked &&
        css`
          cursor: not-allowed;
        `}

      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
`;
