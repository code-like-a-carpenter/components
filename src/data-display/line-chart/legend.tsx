import {
  LegendItem,
  LegendLabel,
  LegendOrdinal,
  LegendShape,
} from '@visx/legend';
import {valueOrIdentityString} from '@visx/legend/lib/util/valueOrIdentity';
import cx from 'classnames';
import {ScaleOrdinal} from 'd3-scale';

import {TooltipData} from '../fact/types';

export interface LegendProps {
  readonly scale: ScaleOrdinal<string, string, never>;
  readonly tooltipData: TooltipData | undefined;
}

export const Legend = ({scale, tooltipData}: LegendProps) => (
  <LegendOrdinal scale={scale} direction="row">
    {(labels) => (
      <div
        className="visx-legend"
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {labels.map((label, i) => (
          <LegendItem
            className={cx(
              'line_chart__legend',
              label.text === tooltipData?.seriesName &&
                'line_chart__legend--active'
            )}
            key={`legend-${label.text}-${i}`}
            margin={0}
          >
            <LegendShape
              height={15}
              width={15}
              margin="2px 4px 2px 0"
              item={scale(label.text)}
              itemIndex={i}
              label={label}
              fill={valueOrIdentityString}
              size={valueOrIdentityString}
            />
            <LegendLabel
              label={label.text}
              flex={1}
              margin={'0 4px'}
              align={'left'}
            />
          </LegendItem>
        ))}
      </div>
    )}
  </LegendOrdinal>
);
