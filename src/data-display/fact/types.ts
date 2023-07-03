import type {ComponentType, ReactNode} from 'react';

export interface FactContainerProps {
  label: ReactNode;
  output: ReactNode;
  rowSpan?: number;
  colSpan?: number;
}

export type FactContainer = ComponentType<FactContainerProps>;
