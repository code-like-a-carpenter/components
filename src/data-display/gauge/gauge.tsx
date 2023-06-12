import {scaleLinear} from '@visx/scale';
import {Arc} from '@visx/shape';
import {useMemo} from 'react';

import {
  NumberRenderer,
  NumberRendererProps,
  Renderer,
  RendererProps,
} from '../../renderers';

export type GaugeProps<
  R extends Renderer<number> = typeof NumberRenderer,
  P extends Omit<RendererProps<number>, 'value'> = Omit<
    NumberRendererProps,
    'value'
  >
> = RendererProps<number> & {
  max: number;
  min: number;
  ValueRenderer?: R;
  valueRendererProps?: P;
};

/** @internal */
function polarToCartesian({radius, angle}: {radius: number; angle: number}) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

interface TickProps<
  R extends Renderer<number> = typeof NumberRenderer,
  P extends Omit<RendererProps<number>, 'value'> = Omit<
    NumberRendererProps,
    'value'
  >
> {
  angle: number;
  fill: string;
  label: number;
  radius: number;
  ValueRenderer: R;
  valueRendererProps?: P;
}

const Tick = ({
  angle: rawAngle,
  fill,
  label,
  radius,
  ValueRenderer,
  valueRendererProps,
}: TickProps) => {
  const angleValue = rawAngle - Math.PI * 0.5;
  const tickLength = 8;
  const tickFrom = polarToCartesian({angle: angleValue, radius});
  const tickTo = polarToCartesian({
    angle: angleValue,
    radius: radius + tickLength,
  });

  const textAnchor =
    Math.abs(rawAngle) < 0.25 ? 'middle' : rawAngle < 0 ? 'end' : 'start';

  const point = polarToCartesian({
    angle: angleValue,
    radius: radius + tickLength + 4,
  });

  return (
    <>
      <line
        stroke={'black'}
        strokeWidth={1}
        x1={tickFrom.x}
        x2={tickTo.x}
        y1={tickFrom.y}
        y2={tickTo.y}
        fill={fill}
      />
      <text
        x={point.x}
        y={point.y}
        textAnchor={textAnchor}
        dy={'0.25em'}
        fill={fill}
      >
        <ValueRenderer value={label} {...valueRendererProps} />
      </text>
    </>
  );
};

export const Gauge = ({
  max,
  min,
  value,
  ValueRenderer = NumberRenderer,
  valueRendererProps,
}: GaugeProps) => {
  const colorVar = useMemo(() => {
    if (value < min) {
      return '--bs-danger';
    }

    if (value > max) {
      return '--bs-danger';
    }

    return '--bs-success';
  }, [max, min, value]);

  let low = min;
  let high = max;

  if (value < min) {
    const range = Math.abs(max - min);
    low = min;
    min = value - Math.round(0.3 * range);
  }

  if (value > max) {
    const range = Math.abs(max - min);
    high = max;
    max = value + Math.round(0.3 * range);
  }

  const width = 500;
  const height = width;

  const padding = width * 0.12;

  const startAngle = useMemo(() => (-Math.PI / 2) * 1.1, []);
  const maxLength = useMemo(() => Math.PI * 1.1, []);
  const endAngle = startAngle + maxLength;

  const scale = scaleLinear({
    domain: [min, max],
    range: [startAngle, endAngle],
  });

  const axisRadius = width / 2 - padding;
  const axisWidth = 3;
  const axisOuterRadius = axisRadius + axisWidth;

  const gaugeGap = axisWidth / 2;

  const gaugeWidth = axisWidth * 5;
  const gaugeRadius = axisRadius - gaugeGap - gaugeWidth;
  const gaugeOuterRadius = axisRadius - gaugeGap;

  const cos = Math.abs(Math.cos(startAngle)) * axisRadius;
  const cosWithPadding = cos + padding;

  const boxHeight = height / 2 + cosWithPadding;

  return (
    <>
      <svg
        viewBox={`-${width / 2} -${(boxHeight / 3) * 2} ${width} ${boxHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Arc
          innerRadius={axisRadius}
          outerRadius={axisOuterRadius}
          startAngle={scale(min)}
          endAngle={scale(low)}
          fill={`var(--bs-danger)`}
        />
        <Arc
          innerRadius={axisRadius}
          outerRadius={axisOuterRadius}
          startAngle={scale(low)}
          endAngle={scale(high)}
          fill={`var(--bs-success)`}
        />
        <Arc
          innerRadius={axisRadius}
          outerRadius={axisOuterRadius}
          startAngle={scale(high)}
          endAngle={scale(max)}
          fill={`var(--bs-danger)`}
        />

        <Arc
          innerRadius={gaugeRadius}
          outerRadius={gaugeOuterRadius}
          startAngle={scale(low)}
          endAngle={value > 0 ? scale(max) : scale(min)}
          opacity={0.05}
          fill={`var(${colorVar})`}
        />
        <Arc
          innerRadius={gaugeRadius}
          outerRadius={gaugeOuterRadius}
          startAngle={scale(low)}
          endAngle={scale(value)}
          fill={`var(${colorVar})`}
        />

        <Tick
          label={min}
          radius={axisRadius}
          angle={scale(min)}
          fill="var(--bs-secondary)"
          ValueRenderer={ValueRenderer}
          valueRendererProps={valueRendererProps}
        />
        <Tick
          label={low}
          radius={axisRadius}
          angle={scale(low)}
          fill="var(--bs-secondary)"
          ValueRenderer={ValueRenderer}
          valueRendererProps={valueRendererProps}
        />
        <Tick
          label={high}
          radius={axisRadius}
          angle={scale(high)}
          fill="var(--bs-secondary)"
          ValueRenderer={ValueRenderer}
          valueRendererProps={valueRendererProps}
        />
        <Tick
          label={max}
          radius={axisRadius}
          angle={scale(max)}
          fill="var(--bs-secondary)"
          ValueRenderer={ValueRenderer}
          valueRendererProps={valueRendererProps}
        />

        <text dominantBaseline={'middle'} textAnchor={'middle'} fontSize="300%">
          <ValueRenderer value={value} {...valueRendererProps} />
        </text>
      </svg>
    </>
  );
};
