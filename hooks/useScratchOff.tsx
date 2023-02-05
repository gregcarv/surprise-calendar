import { EVENT_TYPES } from "@/lib/constants/eventTypes";
import { getXY } from "@/lib/utils/getXY";
import { isdeviceType, isTouchDevice } from "@/lib/utils/isTouchDevice";
import { scratch } from "@/lib/utils/scratch";
import React, { useEffect, useRef, useState } from "react";

export const useScratchOff = (ref: React.RefObject<HTMLCanvasElement>) => {
  const canvas = ref.current;
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<"touch" | "mouse">(isdeviceType);
  const rectRef = useRef<{ x: number; y: number }>();
  const contextRef = useRef<CanvasRenderingContext2D | null>();

  if (canvas) {
    contextRef.current = canvas.getContext("2d");

    if (contextRef.current) {
      contextRef.current.fillStyle = "blue";
      contextRef.current.fillRect(0, 0, 200, 200);
    }

    if (rectRef) {
      rectRef.current = {
        x: canvas.getBoundingClientRect().left,
        y: canvas.getBoundingClientRect().top,
      };
    }
  }

  useEffect(() => {
    setDeviceType(isdeviceType);
  }, []);

  // // scratch
  useEffect(() => {
    const handleEvents = (event: Event | MouseEvent | TouchEvent) => {
      const rectLeft = (rectRef.current && rectRef.current.x) || 0;
      const rectTop = (rectRef.current && rectRef.current.y) || 0;

      switch (event.type) {
        case EVENT_TYPES[deviceType].down: {
          setIsDragged(true);
          //Get x and y position

          setMousePos(getXY({ event, rectLeft, rectTop }));
          scratch({
            x: mousePos.x,
            y: mousePos.y,
            context: contextRef.current,
          });
          break;
        }

        case EVENT_TYPES[deviceType].move: {
          if (!isTouchDevice()) {
            event.preventDefault();
          }
          if (isDragged) {
            setMousePos(getXY({ event, rectLeft, rectTop }));
            scratch({
              x: mousePos.x,
              y: mousePos.y,
              context: contextRef.current,
            });
          }
          break;
        }

        case EVENT_TYPES[deviceType].up: {
          setIsDragged(false);
          break;
        }

        case "mouseleave": {
          setIsDragged(false);
          break;
        }

        default: {
          setIsDragged(false);
        }
      }
    };

    //Start Scratch
    canvas?.addEventListener(EVENT_TYPES[deviceType].down, handleEvents);

    //mousemove/touchmove
    canvas?.addEventListener(EVENT_TYPES[deviceType].move, handleEvents);

    //stop drawing
    canvas?.addEventListener(EVENT_TYPES[deviceType].up, handleEvents);

    //If mouse leaves the square
    canvas?.addEventListener("mouseleave", handleEvents);

    return () => {
      canvas?.removeEventListener(EVENT_TYPES[deviceType].down, handleEvents);
      canvas?.removeEventListener(EVENT_TYPES[deviceType].move, handleEvents);
      canvas?.removeEventListener(EVENT_TYPES[deviceType].up, handleEvents);
      canvas?.removeEventListener("mouseleave", handleEvents);
    };
  }, [canvas, deviceType, isDragged, mousePos.x, mousePos.y]);
};
