import {DateTime} from 'luxon';
import React from 'react';

import {DateRenderer, DateRendererContext} from './date-renderer';
export default {
  component: DateRenderer,
  title: 'Renderers/DateRenderer',
};

const dateString = '2020-06-01';
const date = new Date(dateString);

const relativeReference = new Date('2020-06-10');

export const dateRenderer = () => <DateRenderer value={date} />;
export const usingDateString = () => <DateRenderer value={dateString} />;
export const usingEpoch = () => <DateRenderer value={date.getTime()} />;
export const timeSince = () => (
  <DateRenderer value={date} reference={relativeReference} relative />
);
export const dateRange = () => (
  <DateRenderer value={date} reference={relativeReference} range />
);
export const relative = () => (
  <DateRenderer value={date} reference={relativeReference} relative />
);
export const relativeNegative = () => (
  <DateRenderer value={relativeReference} reference={date} relative />
);
export const relativeNegativeIsNull = () => (
  <DateRenderer
    value={relativeReference}
    reference={date}
    relative
    negativeIsNull
  />
);
export const invalidDateString = () => <DateRenderer value="not a date" />;
export const withOverrides = () => (
  <DateRenderer value={date} format={DateTime.DATE_SHORT} />
);
export const withOverridesFromContext = () => (
  <DateRendererContext.Provider value={{format: DateTime.DATETIME_HUGE}}>
    <DateRenderer value={date} />
  </DateRendererContext.Provider>
);
