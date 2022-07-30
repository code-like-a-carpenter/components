import 'moment-timezone';

import moment from 'moment';
import React from 'react';
import Moment from 'react-moment';

import {useContextWithDefaults} from '../../support';
import {NullRenderer} from '../null-renderer';
import {RendererProps} from '../types';

export interface DateRendererContextProps {
  readonly format?: string;
  /** When rendering relative dates, treat negative numbers as nulls */
  readonly negativeIsNull?: boolean;
  /**
   * Mostly just here for testing so that we can ensure relative values don't
   * break tests.
   */
  readonly reference?: Date;
  /** renders as the number of time units between date and reference */
  readonly relative?: boolean;
  /** renders the date range between date and reference */
  readonly range?: boolean;
}

export const DateRendererContext =
  React.createContext<DateRendererContextProps>({
    format: 'LL',
    negativeIsNull: false,
    range: false,
    reference: new Date(),
    relative: false,
  });

export type DateRendererProps = RendererProps<
  Date | string | number,
  DateRendererContextProps
>;

export const DateRenderer = ({value, ...rest}: DateRendererProps) => {
  const {format, negativeIsNull, range, reference, relative} =
    useContextWithDefaults(DateRendererContext, rest);

  if (!moment(value).isValid()) {
    return <NullRenderer value={null} />;
  }
  if (range) {
    const [start, end] = [reference, value].sort();
    return (
      <Moment duration={start} local withTitle>
        {end}
      </Moment>
    );
  }

  if (relative) {
    if (negativeIsNull) {
      return <NullRenderer value={null} />;
    }
    return (
      <Moment from={reference} local withTitle>
        {value}
      </Moment>
    );
  }

  return (
    <Moment format={format} local withTitle>
      {value}
    </Moment>
  );
};
