import type {Meta, StoryObj} from '@storybook/react';

import {formatBytes} from '../../renderers';

import {Gauge} from './gauge';

const meta: Meta<typeof Gauge> = {
  component: Gauge,
  decorators: [
    (Story) => (
      <div style={{height: '30vh', width: '30vw'}}>
        <Story />
      </div>
    ),
  ],
  title: 'Data Display/Gauge',
};

export default meta;

type Story = StoryObj<typeof Gauge>;

export const InRange: Story = {args: {max: 10, min: 0, value: 3}};
export const Min = {args: {max: 10, min: 0, value: 0}};
export const Max = {args: {max: 10, min: 0, value: 10}};
export const UnderRange = {args: {max: 10, min: 0, value: -3}};
export const OverRange = {args: {max: 10, min: 0, value: 13}};
export const Bytes: Story = {
  args: {
    labelFormatter: new Intl.NumberFormat('en', {style: 'unit', unit: 'byte'})
      .format,
    max: 1024 * 1024,
    min: 0,
    value: 300000,
    valueFormatter: new Intl.NumberFormat('en', {style: 'unit', unit: 'byte'})
      .format,
  },
};
export const Kilobytes: Story = {
  args: {
    labelFormatter: (value) => {
      const {unit, val} = formatBytes(value);
      const nf = new Intl.NumberFormat('en', {
        style: 'unit',
        unit,
      });
      return nf.format(val);
    },
    max: 1024 * 1024,
    min: 0,
    value: 300000,
    valueFormatter: (value) => {
      const {unit, val} = formatBytes(value);
      const nf = new Intl.NumberFormat('en', {
        style: 'unit',
        unit,
      });
      return nf.format(val);
    },
  },
};
export const Percent: Story = {
  args: {
    labelFormatter: new Intl.NumberFormat('en', {style: 'percent'}).format,
    max: 1,
    min: 0,
    value: 0.3,
    valueFormatter: new Intl.NumberFormat('en', {style: 'percent'}).format,
  },
};
