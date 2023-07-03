import type {Meta} from '@storybook/react';
import {DateTime} from 'luxon';

import {DateFormatterContext} from '../../formatters/hooks/use-date-formatter';
import {SimpleErrorBoundary} from '../../simple-error-boundary';

import {DateRenderer} from './date-renderer';

const meta: Meta<typeof DateRenderer> = {
  component: DateRenderer,
  title: 'Renderers/DateRenderer',
};

export default meta;

const dateString = '2020-06-01';
const date = new Date(dateString);

export const Default = () => <DateRenderer value={date} />;
export const UsingDateString = () => <DateRenderer value={dateString} />;
export const UsingEpoch = () => <DateRenderer value={date.getTime()} />;

export const InvalidDateString = () => (
  <SimpleErrorBoundary>
    <DateRenderer value="not a date" />;
  </SimpleErrorBoundary>
);
export const WithOverrides = () => (
  <DateRenderer value={date} {...DateTime.DATE_SHORT} />
);
export const WithOverridesFromContext = () => (
  <DateFormatterContext.Provider value={DateTime.DATETIME_HUGE}>
    <DateRenderer value={date} />
  </DateFormatterContext.Provider>
);
