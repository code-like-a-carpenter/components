import type {Meta} from '@storybook/react';
import {DateTime} from 'luxon';

import {DurationRenderer} from './duration-renderer';

const meta: Meta<typeof DurationRenderer> = {
  component: DurationRenderer,
  title: 'Renderers/DurationRenderer',
};

export default meta;

const dateString = '2020-06-01';
const date = new Date(dateString);

const relativeReference = new Date('2020-06-10');

export const TimeSince = () => (
  <DurationRenderer
    value={DateTime.fromJSDate(relativeReference)
      .diff(DateTime.fromJSDate(date))
      .toMillis()}
  />
);

export const ISO = () => (
  <DurationRenderer
    format="iso"
    value={DateTime.fromJSDate(relativeReference)
      .diff(DateTime.fromJSDate(date))
      .toMillis()}
  />
);

export const RelativeNegative = () => (
  <DurationRenderer
    value={DateTime.fromJSDate(date)
      .diff(DateTime.fromJSDate(relativeReference))
      .toMillis()}
  />
);
