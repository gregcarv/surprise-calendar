import React from "react";
import { TdataEntry } from "./data";

export type TGridItemProps = {
  data: TdataEntry;
  clickedId: number;
};

export type TmousePosition = { x: number; y: number };
