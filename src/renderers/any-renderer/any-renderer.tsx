import {DateTime} from 'luxon';
import {isValidElement} from 'react';

import type {
  BooleanFormatterContextProps,
  DateFormatterContextProps,
  NullFormatterContextProps,
  NumberFormatterContextProps,
  ObjectFormatterContextProps,
} from '../../formatters';
import {BooleanRenderer} from '../boolean-renderer';
import {DateRenderer} from '../date-renderer';
import {NullRenderer} from '../null-renderer';
import {NumberRenderer} from '../number-renderer';
import {ObjectRenderer} from '../object-renderer';
import type {Renderer} from '../types';

/* eslint-disable complexity */
/** Renderers any value, as best as it can */
export const AnyRenderer: Renderer<
  unknown,
  BooleanFormatterContextProps &
    DateFormatterContextProps &
    NullFormatterContextProps &
    NumberFormatterContextProps &
    ObjectFormatterContextProps
> = (props) => {
  const {value} = props;

  if (
    typeof value === 'object' ||
    typeof value === 'function' ||
    typeof value === 'symbol'
  ) {
    if (value === null) {
      return <NullRenderer {...props} value={value} />;
    }

    if (value instanceof Date) {
      return <DateRenderer {...props} value={value} />;
    }

    if (isValidElement(value)) {
      return <>{value}</>;
    }

    return <ObjectRenderer {...props} value={value} />;
  }

  if (typeof value === 'undefined') {
    return <NullRenderer {...props} value={null} />;
  }

  if (typeof value === 'number') {
    return <NumberRenderer {...props} value={value} />;
  }

  if (typeof value === 'bigint') {
    return <>{value}</>;
  }

  if (typeof value === 'string') {
    if (DateTime.fromISO(value).isValid) {
      return <DateRenderer {...props} value={value} />;
    }
    return <>{value}</>;
  }

  if (typeof value === 'boolean') {
    return <BooleanRenderer {...props} value={value} />;
  }

  return <NullRenderer {...props} value={null} />;
};

/* eslint-enable complexity */
