import {createContext, useMemo} from 'react';
import {Label, LabelList, Pie, PieChart, ResponsiveContainer} from 'recharts';

import {useLocale} from '../../core';
import type {
  RendererWithContext,
  RendererPropsFromContext,
} from '../../renderers';
import {useContextWithPropOverrides} from '../../support';

export interface GaugeContextType {
  readonly animate: boolean;
  readonly labelFormatter?: (value: number) => string;
  readonly valueFormatter?: (value: number) => string;
}

export const GaugeContext = createContext<GaugeContextType>({
  animate: true,
});

export type GaugeProps = RendererPropsFromContext<
  number,
  GaugeContextType,
  Partial<GaugeContextType> & {
    max: number;
    min: number;
  }
>;

export const Gauge: RendererWithContext<
  number,
  GaugeContextType,
  GaugeProps
> = ({min, max, value, ...rest}: GaugeProps) => {
  const locale = useLocale();
  const nf = useMemo(() => new Intl.NumberFormat(locale.language), [locale]);

  const {
    animate,
    labelFormatter = nf.format,
    valueFormatter = nf.format,
  } = useContextWithPropOverrides(GaugeContext, rest);

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

  // An aspect ratio is required for ResponsiveContainer to work properly inside
  // flexbox and grid. This bug does not manifest in Storybook.
  return (
    <>
      <ResponsiveContainer aspect={1} className="data-display-gauge">
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
