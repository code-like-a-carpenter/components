import type {Meta, StoryObj} from '@storybook/react';
import {appleStock, cityTemperature} from '@visx/mock-data';

import {LineChart} from './line-chart';

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  decorators: [
    (Story) => (
      <div style={{height: '30vh', width: '60vw'}}>
        <Story />
      </div>
    ),
  ],
  title: 'Data Display/Line Chart',
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const SingleSeries: Story = {
  args: {
    series: [
      {
        data: appleStock.slice(0, 100).map((as) => ({
          x: new Date(as.date),
          y: as.close,
        })),
        label: 'Apple Stock',
      },
    ],
  },
};

export const LowDensityData: Story = {
  args: {
    series: [
      {
        data: appleStock.slice(0, 10).map((as) => ({
          x: new Date(as.date),
          y: as.close,
        })),
        label: 'Apple Stock',
      },
    ],
  },
};

export const MultipleSeries: Story = {
  args: {
    series: [
      {
        data: cityTemperature.slice(0, 100).map((ct) => ({
          x: new Date(ct.date),
          y: Number(ct.Austin),
        })),
        label: 'Austin',
      },
      {
        data: cityTemperature.slice(0, 100).map((ct) => ({
          x: new Date(ct.date),
          y: Number(ct['New York']),
        })),
        label: 'New York',
      },
      {
        data: cityTemperature.slice(0, 100).map((ct) => ({
          x: new Date(ct.date),
          y: Number(ct['San Francisco']),
        })),
        label: 'San Francisco',
      },
    ],
  },
};
