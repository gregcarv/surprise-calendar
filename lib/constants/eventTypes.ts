export type TmouseTouchEvents = {
  mouse: {
    down: "mousedown" | string;
    move: "mousemove" | string;
    up: "mouseup" | string;
  };
  touch: {
    down: "touchstart" | string;
    move: "touchmove" | string;
    up: "touchend" | string;
  };
};

export const EVENT_TYPES: TmouseTouchEvents = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};
