import {createContext, useCallback} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export interface NullFormatterContextProps {
  readonly null: string;
}

export const NullFormatterContext = createContext<NullFormatterContextProps>({
  null: ' - ',
});

export const useNullFormatter: FormatterHook<
  null,
  NullFormatterContextProps
> = (options) => {
  const {null: nullValue} = useContextWithPropOverrides(
    NullFormatterContext,
    options
  );

  return useCallback(() => nullValue, [nullValue]);
};
