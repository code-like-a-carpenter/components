import {appleStock, cityTemperature} from '@visx/mock-data';

import {LineChart} from './line-chart';

export default {
  component: LineChart,
  title: 'Data Display/Line Chart',
};

export const SingleSeries = () => (
  <>
    <LineChart
      yMin={0}
      series={[
        {
          data: appleStock.slice(0, 100).map((as) => ({
            x: new Date(as.date),
            y: as.close,
          })),
          label: 'Apple Stock',
        },
      ]}
    />
  </>
);

export const LowDensityData = () => (
  <>
    <LineChart
      yMin={0}
      series={[
        {
          data: appleStock.slice(0, 10).map((as) => ({
            x: new Date(as.date),
            y: as.close,
          })),
          label: 'Apple Stock',
        },
      ]}
    />
  </>
);

export const MultipleSeries = () => (
  <>
    <LineChart
      yMin={0}
      series={[
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
      ]}
    />
  </>
);
