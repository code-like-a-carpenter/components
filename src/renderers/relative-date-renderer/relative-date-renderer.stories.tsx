import type {Meta} from '@storybook/react';

import {RelativeDateRenderer} from './relative-date-renderer';

const meta: Meta<typeof RelativeDateRenderer> = {
  component: RelativeDateRenderer,
  title: 'Renderers/RelativeDateRenderer',
};

export default meta;

const dateString = '2020-06-01';
const date = new Date(dateString);

const relativeReference = new Date('2020-06-10');

export const TimeSince = () => (
  <RelativeDateRenderer value={date} referenceDate={relativeReference} />
);

export const ISO = () => (
  <RelativeDateRenderer
    format="iso"
    value={date}
    referenceDate={relativeReference}
  />
);

export const RelativeNegative = () => (
  <RelativeDateRenderer value={relativeReference} referenceDate={date} />
);
