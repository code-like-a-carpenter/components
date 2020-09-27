import 'moment-timezone';

import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import {RendererProps, useContextWithDefaults} from '../support';
import {NullRenderer} from '../null-renderer';

export type DateRendererContextProps = {
  format?: string;
  /** When rendering relative dates, treat negative numbers as nulls */
  negativeIsNull?: boolean;
  /**
   * Mostly just here for testing so that we can ensure relative values don't
   * break tests.
   */
  reference?: Date;
  /** renders as the number of time units between date and reference */
  relative?: boolean;
  /** renders the date range between date and reference */
  range?: boolean;
};

export const DateRendererContext = React.createContext<
  DateRendererContextProps
>({
  format: 'LL',
  negativeIsNull: false,
  range: false,
  reference: new Date(),
  relative: false,
});

export type DateRendererProps = RendererProps<
  DateRendererContextProps,
  Date | string | number
>;

export const DateRenderer = ({value, ...rest}: DateRendererProps) => {
  const {
    format,
    negativeIsNull,
    range,
    reference,
    relative,
  } = useContextWithDefaults(DateRendererContext, rest);

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
