import cx from 'classnames';
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
import type {RendererWithContext} from '../types';

export type AnyRendererContextProps = BooleanFormatterContextProps &
  DateFormatterContextProps &
  NullFormatterContextProps &
  NumberFormatterContextProps &
  ObjectFormatterContextProps;

export type AnyRendererProps = Partial<AnyRendererContextProps> & {
  className?: string;
};

/* eslint-disable complexity */
/** Renderers any value, as best as it can */
export const AnyRenderer: RendererWithContext<
  unknown,
  AnyRendererContextProps,
  AnyRendererProps
> = (props) => {
  const {className, value} = props;
  const classNames = cx(className, 'renderer', 'renderer-any');

  if (
    typeof value === 'object' ||
    typeof value === 'function' ||
    typeof value === 'symbol'
  ) {
    if (value === null) {
      return <NullRenderer {...props} className={classNames} value={value} />;
    }

    if (value instanceof Date) {
      return <DateRenderer {...props} className={classNames} value={value} />;
    }

    if (isValidElement(value)) {
      return <span className={classNames}>{value}</span>;
    }

    return <ObjectRenderer {...props} className={classNames} value={value} />;
  }

  if (typeof value === 'undefined') {
    return <NullRenderer {...props} className={classNames} value={null} />;
  }

  if (typeof value === 'number') {
    return <NumberRenderer {...props} className={classNames} value={value} />;
  }

  if (typeof value === 'bigint') {
    return <span className={classNames}>{value.toLocaleString()}</span>;
  }

  if (typeof value === 'string') {
    if (DateTime.fromISO(value).isValid) {
      return <DateRenderer {...props} className={classNames} value={value} />;
    }
    return <span className={classNames}>{value}</span>;
  }

  if (typeof value === 'boolean') {
    return <BooleanRenderer {...props} className={classNames} value={value} />;
  }

  return <NullRenderer {...props} className={classNames} value={null} />;
};

/* eslint-enable complexity */
