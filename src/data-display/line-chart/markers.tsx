import {Group} from '@visx/group';
import {Line} from '@visx/shape';
import type {TooltipInPortalProps} from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import type {ScaleLinear, ScaleOrdinal, ScaleTime} from 'd3-scale';
import type {ComponentType} from 'react';
import {Fragment} from 'react';

import {DateRenderer, NumberRenderer} from '../../renderers';
import type {TooltipData} from '../types';

export interface MarkersProps {
  data: TooltipData;
  top: number;
  left: number;
  /**
   * Provided if you don't want to also supply a TooltipComponent, but seems to
   * have positioning issues.
   */
  PortaledTooltip: ComponentType<TooltipInPortalProps>;
  xScale: ScaleLinear<number, number> | ScaleTime<number, number>;
  yScale: ScaleLinear<number, number> | ScaleTime<number, number>;
  legendScale: ScaleOrdinal<string, string>;
  padding: number;
  boxHeight: number;
  boxWidth: number;
}

/**
 * The Markers components renders inside ths svg when the tooltip is open. You
 * might use this for to show the point that's being hovered.
 */
export const Markers = ({
  data: {values, xValue},
  left,
  PortaledTooltip,
  padding,
  boxHeight,
  boxWidth,
  yScale,
}: MarkersProps) => (
  <>
    <Group>
      <Line
        from={{x: left, y: padding / 2}}
        to={{x: left, y: boxHeight}}
        stroke="var(--bs-tertiary-color)"
        strokeWidth={1}
        pointerEvents="none"
        strokeDasharray="5,2"
      />

      {Object.entries(values).map(([label, value]) => (
        <g key={label}>
          <circle
            cx={left}
            cy={yScale(value)}
            r={2}
            fill="var(--bs-tertiary-color)"
            stroke="var(--bs-tertiary-bg)"
            strokeWidth={2}
            pointerEvents="none"
          />
        </g>
      ))}
    </Group>

    {Object.entries(values).map(([label, value]) => (
      <Fragment key={label}>
        <Line
          from={{x: padding / 2, y: yScale(value)}}
          to={{x: boxWidth, y: yScale(value)}}
          stroke="var(--bs-tertiary-color)"
          strokeWidth={1}
          pointerEvents="none"
          strokeDasharray="5,2"
        />
        <PortaledTooltip top={yScale(value)} left={0}>
          {label}{' '}
          {value instanceof Date ? (
            <DateRenderer value={value} />
          ) : (
            <NumberRenderer value={value} />
          )}
        </PortaledTooltip>
      </Fragment>
    ))}

    <PortaledTooltip key={Math.random()} top={boxHeight + padding} left={left}>
      {xValue instanceof Date ? (
        <DateRenderer value={xValue} />
      ) : (
        <NumberRenderer value={xValue} />
      )}
    </PortaledTooltip>
  </>
);
