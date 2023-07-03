import {faker} from '@faker-js/faker';
import type {Meta} from '@storybook/react';

import {useByteFormatter} from '../../formatters';
import {ByteRenderer} from '../../renderers';
import {RelativeDateRenderer} from '../../renderers/relative-date-renderer';
import {Fact} from '../fact';
import {Gauge} from '../gauge';

import {FactGrid} from './fact-grid';

const meta: Meta<typeof FactGrid> = {
  component: FactGrid,
  title: 'Data Display/Fact Grid',
};

export default meta;

/**
 * Unfortunately, container queries don't support css variables, so you'll need
 * to manually copy the style tag in this example and update the max width to be
 * var(--fact-grid-cols) * var(--fact-min-width)
 */
export const CheckRunReporterAccountPage = () => {
  const accountPageData = {
    bytes: 3468496675,
    bytesThisMonth: 1129710,
    count: 29183,
    countThisMonth: 15,
    defaultBranchName: 'master',
    description: "The test reporter your CI service didn't build",
    lastSubmissionDate: faker.date.past(),
    summaries: {
      capacity: {
        CapacityUnits: 0.5,
        Table: {
          CapacityUnits: 0.5,
        },
        TableName: 'check-run-reporter-TableCheckRunSummary-PYMDJI0QE8KS',
      },
      hasNextPage: false,
      items: [
        {
          attemptsPerCheckRun: 1,
          branchName: 'master',
          counts: {
            error: 0,
            failure: 0,
            skip: 1,
            success: 13,
            todo: 0,
            total: 14,
            warning: 0,
          },
          createdAt: '2023-05-29T21:55:27.252Z',
          duration: 48.125,
          id: 'Q2hlY2tSdW5TdW1tYXJ5OkNIRUNLI2doIzE3OTk5MTA3MSNtYXN0ZXIjOiNMQUJFTCNQOkNvbnRyYWN0IFRlc3Rz',
          label: 'P:Contract Tests',
          publicId: 'd398a073-519c-4ce8-912a-1c6929e02bce',
          repoId: '179991071',
          shardCount: 0,
          stability: 1,
          successDuration: 48.125,
          updatedAt: '2023-05-29T21:55:27.252Z',
          vendor: 'gh',
          version: 1,
        },
        {
          attemptsPerCheckRun: 1,
          branchName: 'master',
          counts: {
            error: 0,
            failure: 0,
            skip: 0,
            success: 121.4,
            todo: 0,
            total: 121.4,
            warning: 0,
          },
          createdAt: '2023-05-27T04:43:23.212Z',
          duration: 78.97619999999998,
          id: 'Q2hlY2tSdW5TdW1tYXJ5OkNIRUNLI2doIzE3OTk5MTA3MSNtYXN0ZXIjOiNMQUJFTCNQOkplc3QgKFVuaXQgVGVzdHMp',
          label: 'P:Jest (Unit Tests)',
          publicId: '389fb198-4ea5-4e18-bb20-2871f146d2ba',
          repoId: '179991071',
          shardCount: 0,
          stability: 1,
          successDuration: 78.97619999999998,
          updatedAt: '2023-05-29T21:47:51.690Z',
          vendor: 'gh',
          version: 10,
        },
      ],
    },
    token: faker.string.uuid(),
  };

  const bytesFormatter = useByteFormatter({});

  return (
    <>
      <style>
        {`
          .fact-grid--container {
            container-name: fact-grid;
            container-type: inline-size;
          }

          @container fact-grid (max-width: 45rem) {
            .fact-grid {
              --fact-grid-cols: 1!important;
            }

            .fact-grid .fact-container {
              grid-area: span var(--fact-grid-row-span) / span 1;
            }

            .data-display-gauge {
              width: calc(var(--fact-grid-cols) * var(--fact-min-width)) !important;
            }
          }
        `}
      </style>
      <FactGrid columns={3}>
        <Fact label="Submissions This Month">
          <Gauge value={accountPageData.countThisMonth} min={0} max={50000} />
        </Fact>
        <Fact label="Bytes This Month">
          <Gauge
            value={accountPageData.bytesThisMonth}
            min={0}
            max={1024 * 1024 * 1024}
            labelFormatter={bytesFormatter}
            valueFormatter={bytesFormatter}
          />
        </Fact>
        <Fact label="All Time Submissions" value={accountPageData.count} />
        <Fact
          label="All Time Bytes"
          value={accountPageData.bytes}
          Renderer={ByteRenderer}
        />
        <Fact
          colSpan={2}
          rowSpan={2}
          label="Token"
          value={accountPageData.token}
        />
        <Fact
          label="Default Branch Name"
          value={accountPageData.defaultBranchName}
        />
        <Fact
          label="Last Submission Received"
          value={accountPageData.lastSubmissionDate}
          Renderer={RelativeDateRenderer}
        />
      </FactGrid>
    </>
  );
};
