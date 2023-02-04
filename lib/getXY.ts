import { TmousePosition } from "@/types/gridItem";
import { isTouchDevice } from "./isTouchDevice";

//Exact x and y position of mouse/touch
export const getXY = ({
  event,
  rectLeft,
  rectTop,
}: {
  event: Event | MouseEvent | TouchEvent;
  rectLeft: number;
  rectTop: number;
}) => {
  const x =
    (!isTouchDevice()
      ? (event as MouseEvent).pageX
      : (event as TouchEvent).touches[0].pageX) - rectLeft;
  const y =
    (!isTouchDevice()
      ? (event as MouseEvent).pageY
      : (event as TouchEvent).touches[0].pageY) - rectTop;

  return { x, y };
};
