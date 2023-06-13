import assert from 'assert';

import {AxisBottom, AxisLeft} from '@visx/axis';
import {curveMonotoneX} from '@visx/curve';
import {localPoint} from '@visx/event';
import {Grid} from '@visx/grid';
import {Group} from '@visx/group';
import type {ContinuousDomain} from '@visx/scale';
import {scaleLinear, scaleOrdinal, scaleTime} from '@visx/scale';
import {Bar, LinePath} from '@visx/shape';
import {useTooltip, useTooltipInPortal} from '@visx/tooltip';
import {bisector, extent} from 'd3-array';
import type {ComponentType, MouseEvent} from 'react';
import {useMemo} from 'react';

import type {TooltipData} from '../fact/types';

import type {LegendProps} from './legend';
import {Legend} from './legend';
import type {MarkersProps} from './markers';
import {Markers} from './markers';
import type {Datum, Graphable, LineSeries} from './types';

export interface LineChartProps {
  readonly xMin?: number;
  readonly xMax?: number;
  readonly yMin?: number;
  readonly yMax?: number;
  readonly series: LineSeries[];
  MarkersComponent?: ComponentType<MarkersProps>;
  LegendComponent?: ComponentType<LegendProps>;
}

/** @internal */
function getX({x}: Datum) {
  return x instanceof Date ? x.getTime() : x;
}

/** @internal */
function getY({y}: Datum) {
  return y instanceof Date ? y.getTime() : y;
}

/**
 * @experimental This component gets the job done, but it's kinda ugly (both
 * visually and its API). It will likely change between major releases.
 */
export const LineChart = ({
  xMin,
  xMax,
  yMax,
  yMin,
  series,
  LegendComponent = Legend,
  MarkersComponent = Markers,
}: LineChartProps) => {
  const allData = useMemo(
    () => series.reduce((acc, {data}) => acc.concat(data), [] as Datum[]),
    [series]
  );

  const xIsDates = useMemo(
    () => allData.every(({x}) => x instanceof Date),
    [allData]
  );
  const yIsDates = useMemo(
    () => allData.every(({y}) => y instanceof Date),
    [allData]
  );

  const width = 500;
  const height = width / 2;
  const padding = 0.1 * width;

  const boxHeight = height - padding;
  const boxWidth = width - padding;

  const halfPadding = padding / 2;

  const xDomain = useMemo(
    () => extent(allData, getX) as ContinuousDomain,
    [allData]
  );
  const yDomain = useMemo(
    () => extent(allData, getY) as ContinuousDomain,
    [allData]
  );

  const xScale = useMemo(
    () =>
      (xIsDates ? scaleTime : scaleLinear)({
        domain: [xMin ?? xDomain[0], xMax ?? xDomain[1]],
        range: [halfPadding, boxWidth],
      }),
    [boxWidth, halfPadding, xDomain, xIsDates, xMax, xMin]
  );

  const yScale = useMemo(
    () =>
      (yIsDates ? scaleTime : scaleLinear)({
        domain: [yMin ?? yDomain[0], yMax ?? yDomain[1]],
        nice: true,
        range: [boxHeight, halfPadding],
      }),
    [boxHeight, halfPadding, yDomain, yIsDates, yMax, yMin]
  );

  assert(
    series.length < 9,
    "We didn't expect more than 9 series for this component. Please open an issue so we can add more colors"
  );
  const legendScale = useMemo(
    () =>
      scaleOrdinal({
        domain: series.map(({label}) => label),
        // These are the standard bootstrap colors
        range: [
          'blue',
          'indigo',
          // purple and indigo look really close, so we'll skip one
          // 'purple',
          'pink',
          'red',
          'orange',
          'yellow',
          'green',
          'teal',
          'cyan',
        ],
      }),
    [series]
  );

  const bisect = useMemo(() => bisector<Datum, Graphable>((d) => d.x).left, []);

  const numTicksColumns = 6;
  const numTicksRows = undefined;

  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<TooltipData>();

  const {containerRef, TooltipInPortal} = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const handleMouseOver = (
    event: MouseEvent<SVGRectElement | SVGPathElement>
  ) => {
    const coordinates = localPoint(event);

    // eslint-disable-next-line prefer-destructuring
    // The react typedefs clobber the dom typedefs here, so we have to force it.
    const target: SVGGeometryElement =
      event.target as unknown as SVGGeometryElement;

    if (coordinates) {
      const xValue = xScale.invert(coordinates.x);

      showTooltip({
        tooltipData: {
          coordinates,
          seriesName: target.dataset.series,
          values: Object.fromEntries(
            series.map(({label, data}) => {
              const index = bisect(data, xValue, 1);
              return [label, data[index].y];
            })
          ),
          xValue,
        },
        tooltipLeft: coordinates.x,
        tooltipTop: coordinates.y,
      });
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <svg
          ref={containerRef}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={boxWidth}
            height={boxHeight}
            numTicksColumns={numTicksColumns}
            numTicksRows={numTicksRows}
            stroke="var(--bs-secondary-bg)"
          />

          <AxisBottom
            numTicks={numTicksColumns}
            scale={xScale}
            stroke={'var(--bs-secondary-color)'}
            top={boxHeight}
          />
          <AxisLeft
            left={halfPadding}
            numTicks={numTicksRows}
            scale={yScale}
            stroke={'var(--bs-secondary-color)'}
          />

          <Bar
            x={halfPadding}
            y={0}
            fill={'transparent'}
            width={boxWidth - halfPadding}
            height={height}
            onMouseMove={handleMouseOver}
            onMouseOut={hideTooltip}
          />

          {series.map(({data, label}, index) => (
            <Group key={index}>
              <LinePath
                data={data}
                data-series={label}
                x={({x}) => xScale(x)}
                y={({y}) => yScale(y)}
                stroke={legendScale(label)}
                strokeWidth={1}
                curve={curveMonotoneX}
                onMouseMove={handleMouseOver}
                onMouseOut={hideTooltip}
              />
            </Group>
          ))}

          {tooltipOpen && tooltipData && (
            <MarkersComponent
              top={tooltipTop}
              left={tooltipLeft}
              data={tooltipData}
              PortaledTooltip={TooltipInPortal}
              xScale={xScale}
              yScale={yScale}
              legendScale={legendScale}
              padding={padding}
              boxHeight={boxHeight}
              boxWidth={boxWidth}
            />
          )}
        </svg>

        {series.length > 1 && (
          <LegendComponent scale={legendScale} tooltipData={tooltipData} />
        )}
      </div>
    </>
  );
};
