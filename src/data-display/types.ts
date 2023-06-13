export type Graphable = number | Date;

export interface Coordinates {
  readonly x: number;
  readonly y: number;
}

export interface TooltipData {
  coordinates: Coordinates;
  /** name of the hovered series, if present */
  seriesName: string | undefined;
  /** value of each series where x value intersects */
  values: Record<string, Graphable>;
  xValue: Graphable;
}
