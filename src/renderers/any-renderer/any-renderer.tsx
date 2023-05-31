import {DateTime} from 'luxon';
import {createContext, isValidElement} from 'react';

import {useContextWithDefaults} from '../../support';
import {BooleanRenderer, BooleanRendererContextType} from '../boolean-renderer';
import {DateRenderer, DateRendererContextProps} from '../date-renderer';
import {NullRenderer, NullRendererContextType} from '../null-renderer';
import {NumberRenderer} from '../number-renderer';
import {ObjectRenderer} from '../object-renderer';
import {RendererProps} from '../types';

export interface AnyRendererContextType {
  readonly boolean?: BooleanRendererContextType;
  readonly date?: DateRendererContextProps;
  readonly null?: NullRendererContextType;
}

export const AnyRendererContext = createContext<AnyRendererContextType>({});

export type AnyRendererProps = RendererProps<unknown, AnyRendererContextType>;

// eslint-disable-next-line complexity
export const AnyRenderer = ({value, ...rest}: AnyRendererProps) => {
  const {
    boolean,
    date,
    null: nullDefaults,
  } = useContextWithDefaults(AnyRendererContext, rest);

  if (
    typeof value === 'object' ||
    typeof value === 'function' ||
    typeof value === 'symbol'
  ) {
    if (value === null) {
      return <NullRenderer value={value} {...nullDefaults} />;
    }

    if (value instanceof Date) {
      return <DateRenderer value={value} {...date} />;
    }

    if (isValidElement(value)) {
      return <>{value}</>;
    }

    return <ObjectRenderer value={value} />;
  }

  if (typeof value === 'undefined') {
    return <NullRenderer value={null} {...nullDefaults} />;
  }

  if (typeof value === 'number') {
    return <NumberRenderer value={value}></NumberRenderer>;
  }

  if (typeof value === 'bigint') {
    return <>{value}</>;
  }

  if (typeof value === 'string') {
    if (
      DateTime.fromISO(value).isValid ||
      DateTime.fromMillis(Number(value)).isValid
    ) {
      return <DateRenderer value={value} {...date} />;
    }
    return <>{value}</>;
  }

  if (typeof value === 'boolean') {
    return <BooleanRenderer value={value} {...boolean} />;
  }

  return <NullRenderer value={null} {...nullDefaults} />;
};
