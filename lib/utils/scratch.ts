import { TmousePosition } from "@/types/gridItem";

export const scratch = ({
  x,
  y,
  context,
}: {
  x: TmousePosition["x"];
  y: TmousePosition["y"];
  context: CanvasRenderingContext2D | null | undefined;
}) => {
  //destination-out draws new shapes behind the existing canvas content
  if (context) {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    //arc makes circle - x,y,radius,start angle,end angle
    context.arc(x, y, 12, 0, 2 * Math.PI);
    context.fill();
  }
};
