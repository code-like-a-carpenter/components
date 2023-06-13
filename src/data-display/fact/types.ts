import type {ComponentType, ReactNode} from 'react';

import type {Graphable} from '../line-chart/types';

export interface FactContainerProps {
  label: ReactNode;
  output: ReactNode;
}

export type FactContainer = ComponentType<FactContainerProps>;

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
