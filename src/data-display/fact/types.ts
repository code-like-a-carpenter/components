import type {ComponentType, ReactNode} from 'react';

export interface FactContainerProps {
  label: ReactNode;
  output: ReactNode;
}

export type FactContainer = ComponentType<FactContainerProps>;
