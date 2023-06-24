import {useMemo} from 'react';
import {Label, LabelList, Pie, PieChart, ResponsiveContainer} from 'recharts';

import {useLocale} from '../../core';
import type {RendererProps} from '../../renderers';

export interface GaugeProps extends RendererProps<number> {
  animate?: boolean;
  max: number;
  min: number;
  labelFormatter?: (value: number) => string;
  valueFormatter?: (value: number) => string;
}

export const Gauge = ({
  animate = true,
  max,
  min,
  value,
  labelFormatter,
  valueFormatter,
}: GaugeProps) => {
  const locale = useLocale();
  const nf = useMemo(() => new Intl.NumberFormat(locale.language), [locale]);
  labelFormatter = useMemo(
    () => labelFormatter ?? nf.format.bind(nf),
    [labelFormatter, nf]
  );
  valueFormatter = useMemo(
    () => valueFormatter ?? nf.format.bind(nf),
    [nf, valueFormatter]
  );

  let low = min;
  let high = max;

  const range = Math.abs(max - min);
  if (value < min) {
    low = min;
    min = value - Math.round(0.3 * range);
  }

  if (value > max) {
    high = max;
    max = value + Math.round(0.3 * range);
  }

  const colorVar = useMemo(() => {
    if (value < low) {
      return 'danger';
    }

    if (value > high) {
      return 'danger';
    }

    return 'success';
  }, [high, low, value]);

  const rangeData = useMemo(
    () => [
      {label: min, value: 0},
      {fill: 'var(--bs-danger)', value: Math.abs(low - min) / range},
      {label: low, value: 0},
      {fill: 'var(--bs-success)', value: Math.abs(high - low) / range},
      {label: high, value: 0},
      {fill: 'var(--bs-danger)', value: Math.abs(max - high) / range},
      {label: max, value: 0},
    ],
    [high, low, max, min, range]
  );

  const valueData = useMemo(() => {
    if (value < low) {
      return [
        {
          value: Math.abs(value - min) / range,
        },
        {
          fill: `var(--bs-${colorVar})`,
          stroke: `var(--bs-${colorVar}-border-subtle)`,
          value: Math.abs(low - value) / range,
        },
        {
          value: Math.abs(max - low) / range,
        },
      ];
    }
    return [
      {
        fill: `var(--bs-${colorVar})`,
        stroke: `var(--bs-${colorVar}-border-subtle)`,
        value: Math.abs(value - min) / range,
      },
      {
        value: Math.abs(max - value) / range,
      },
    ];
  }, [colorVar, low, max, min, range, value]);

  const rangeOuterRadius = 60;
  const rangeInnerRadius = rangeOuterRadius - 5;
  const valueOuterRadius = rangeInnerRadius - 1;
  const valueInnerRadius = valueOuterRadius - 14;

  return (
    <>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            isAnimationActive={animate}
            data={valueData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            fill="transparent"
            stroke="transparent"
            innerRadius={`${valueInnerRadius}%`}
            outerRadius={`${valueOuterRadius}%`}
            startAngle={210}
            endAngle={-30}
          >
            <Label
              fill={`var(--bs-${colorVar}`}
              stroke={`var(--bs-${colorVar}`}
              position={'center'}
            >
              {valueFormatter(value)}
            </Label>
          </Pie>
          <Pie
            isAnimationActive={animate}
            data={rangeData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={`${rangeInnerRadius}%`}
            outerRadius={`${rangeOuterRadius}%`}
            startAngle={210}
            endAngle={-30}
          >
            <LabelList
              fill={`var(--bs-${colorVar}`}
              stroke="transparent"
              dataKey={'label'}
              position={'outside'}
              formatter={labelFormatter}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};