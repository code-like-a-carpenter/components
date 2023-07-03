import {createContext, useCallback} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export interface BooleanFormatterContextProps {
  readonly yes: string;
  readonly no: string;
}

export const BooleanFormatterContext =
  createContext<BooleanFormatterContextProps>({
    no: 'No',
    yes: 'Yes',
  });

export const useBooleanFormatter: FormatterHook<
  boolean,
  BooleanFormatterContextProps
> = (options) => {
  const {no, yes} = useContextWithPropOverrides(
    BooleanFormatterContext,
    options
  );

  return useCallback((value) => (value ? yes : no), [no, yes]);
};
