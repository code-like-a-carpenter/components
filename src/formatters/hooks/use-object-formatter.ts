import {createContext} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export interface ObjectFormatterContextProps {
  readonly func: (value: any) => string;
}

export const ObjectFormatterContext =
  createContext<ObjectFormatterContextProps>({
    func: (value: any) => JSON.stringify(value, null, 2),
  });

export const useObjectFormatter: FormatterHook<
  any,
  ObjectFormatterContextProps
> = (options) => {
  const {func} = useContextWithPropOverrides(ObjectFormatterContext, options);

  return func;
};
