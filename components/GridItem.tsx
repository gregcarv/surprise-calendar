import { useFirebaseDataContext } from "@/contexts/firebase/firebaseDataContext";
import { EVENT_TYPES } from "@/lib/constants/eventTypes";
import { getXY } from "@/lib/utils/getXY";
import { isTouchDevice } from "@/lib/utils/isTouchDevice";
import { scratch } from "@/lib/utils/scratch";
import { TGridItemProps, TmousePosition } from "@/types/gridItem";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

export const GridItem = ({
  index,
  isAvailable,
  children,
  ...otherProps
}: TGridItemProps) => {
  const { handleSetData } = useFirebaseDataContext();
  const [cardAvailable, setCardAvailable] = useState<boolean>(isAvailable);

  useEffect(() => {
    if (isAvailable) {
      setCardAvailable(isAvailable);
    }
  }, [isAvailable]);

  const [mousePosition, setMousePosition] = useState<TmousePosition>({
    x: 0,
    y: 0,
  });
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<"touch" | "mouse">(
    isTouchDevice() ? "touch" : "mouse"
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasElem = canvasRef?.current;
  const context = canvasElem?.getContext("2d");

  //Get left and top of canvas
  let rectLeft = canvasElem?.getBoundingClientRect().left || 0;
  let rectTop = canvasElem?.getBoundingClientRect().top || 0;

  const handleClick = () => {
    handleSetData({ id: index, available: false, value: 0 });
  };

  // // set device type
  // useEffect(() => {
  //   if (context) {
  //     let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  //     gradientColor.addColorStop(0, "#c3a3f1");
  //     gradientColor.addColorStop(1, "#6414e9");
  //     context.fillStyle = gradientColor;
  //     context.fillRect(0, 0, 200, 200);
  //   }

  //   setDeviceType(isTouchDevice() ? "touch" : "mouse");
  // }, [context]);

  // // scratch
  // useEffect(() => {
  //   const handleEvents = (event: Event | MouseEvent | TouchEvent) => {
  //     switch (event.type) {
  //       case EVENT_TYPES[deviceType].down: {
  //         setIsDragged(true);
  //         //Get x and y position
  //         setMousePosition(getXY({ event, rectLeft, rectTop }));
  //         scratch({ x: mousePosition.x, y: mousePosition.y, context });
  //         break;
  //       }

  //       case EVENT_TYPES[deviceType].move: {
  //         setIsDragged(false);
  //         break;
  //       }

  //       case EVENT_TYPES[deviceType].up: {
  //         setIsDragged(true);
  //         //Get x and y position
  //         setMousePosition(getXY({ event, rectLeft, rectTop }));
  //         scratch({ x: mousePosition.x, y: mousePosition.y, context });
  //         break;
  //       }

  //       case "mouseleave": {
  //         setIsDragged(false);
  //         break;
  //       }

  //       default: {
  //         setIsDragged(false);
  //       }
  //     }
  //   };

  //   //Start Scratch
  //   canvasElem?.addEventListener(EVENT_TYPES[deviceType].down, handleEvents);

  //   //mousemove/touchmove
  //   canvasElem?.addEventListener(EVENT_TYPES[deviceType].move, handleEvents);

  //   //stop drawing
  //   canvasElem?.addEventListener(EVENT_TYPES[deviceType].up, handleEvents);

  //   //If mouse leaves the square
  //   canvasElem?.addEventListener("mouseleave", handleEvents);

  //   return () => {
  //     canvasElem?.removeEventListener(
  //       EVENT_TYPES[deviceType].down,
  //       handleEvents
  //     );
  //     canvasElem?.removeEventListener(
  //       EVENT_TYPES[deviceType].move,
  //       handleEvents
  //     );
  //     canvasElem?.removeEventListener(EVENT_TYPES[deviceType].up, handleEvents);
  //     canvasElem?.removeEventListener("mouseleave", handleEvents);
  //   };
  // }, [canvasElem, context, deviceType, mousePosition, rectLeft, rectTop]);

  return (
    <div {...otherProps} onClick={handleClick}>
      {children}
      <Overlay
        width="200"
        height="200"
        ref={canvasRef}
        isAvailable={cardAvailable}
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
