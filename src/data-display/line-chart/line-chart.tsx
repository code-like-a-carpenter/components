import assert from 'assert';

import {useMemo} from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {useLocale} from '../../core';
import {DateRenderer, NumberRenderer} from '../../renderers';
import type {Graphable} from '../types';

import type {LineSeries} from './types';

export interface LineChartProps {
  animate?: boolean;
  readonly xMin?: number;
  readonly xMax?: number;
  readonly yMin?: number;
  readonly yMax?: number;
  readonly series: LineSeries[];
}

/**
 * @experimental This component gets the job done, but it's kinda ugly (both
 * visually and its API). It will likely change between major releases.
 */
export const LineChart = ({animate = true, series}: LineChartProps) => {
  const consolidated = useMemo(() => {
    // maps each x value to its set of y values
    const intermediate = new Map<number, Record<string, Graphable>>();

    let xIsDate = false;
    const xMap = new Map<number, Graphable>();
    for (const {data, label} of series) {
      for (const {x, y} of data) {
        let rawX = x;
        if (x instanceof Date) {
          xIsDate = true;
          rawX = x.getTime();
          xMap.set(rawX, x);
        }
        assert(typeof rawX === 'number');
        const datum = intermediate.get(rawX) ?? {};
        intermediate.set(rawX, {
          ...datum,
          [label]: y,
        });
      }
    }

    const raw = [];
    for (const [x, datum] of intermediate.entries()) {
      raw.push({
        ...datum,
        x: xIsDate ? xMap.get(x) : x,
      });
    }
    return raw;
  }, [series]);

  const locale = useLocale();
  const df = new Intl.DateTimeFormat(locale.language, {dateStyle: 'medium'});

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={consolidated}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            tickFormatter={(value) =>
              value instanceof Date ? df.format(value) : value
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) =>
              value instanceof Date ? (
                <DateRenderer value={value} />
              ) : (
                <NumberRenderer value={value} />
              )
            }
          />

          {series.length > 1 && <Legend />}
          {series.map((s) => (
            <Line
              isAnimationActive={animate}
              dataKey={s.label}
              name={s.label}
              key={s.label}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </>
  );
};
