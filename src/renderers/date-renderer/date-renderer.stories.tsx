import {DateTime} from 'luxon';

import {DateRenderer, DateRendererContext} from './date-renderer';
export default {
  component: DateRenderer,
  title: 'Renderers/DateRenderer',
};

const dateString = '2020-06-01';
const date = new Date(dateString);

const relativeReference = new Date('2020-06-10');

export const Default = () => <DateRenderer value={date} />;
export const UsingDateString = () => <DateRenderer value={dateString} />;
export const UsingEpoch = () => <DateRenderer value={date.getTime()} />;
export const TimeSince = () => (
  <DateRenderer value={date} reference={relativeReference} relative />
);
export const DateRange = () => (
  <DateRenderer value={date} reference={relativeReference} range />
);
export const Relative = () => (
  <DateRenderer value={date} reference={relativeReference} relative />
);
export const RelativeNegative = () => (
  <DateRenderer value={relativeReference} reference={date} relative />
);
export const RelativeNegativeIsNull = () => (
  <DateRenderer
    value={relativeReference}
    reference={date}
    relative
    negativeIsNull
  />
);
export const InvalidDateString = () => <DateRenderer value="not a date" />;
export const WithOverrides = () => (
  <DateRenderer value={date} format={DateTime.DATE_SHORT} />
);
export const WithOverridesFromContext = () => (
  <DateRendererContext.Provider value={{format: DateTime.DATETIME_HUGE}}>
    <DateRenderer value={date} />
  </DateRendererContext.Provider>
);
