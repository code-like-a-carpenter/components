import {faker} from '@faker-js/faker';
import type {Meta} from '@storybook/react';
import {useCallback, useContext} from 'react';
import {Card} from 'react-bootstrap';

import {formatBytes} from '../../formatters';
import {Section} from '../../outline';
import {ByteRenderer, CurrencyRenderer} from '../../renderers';
import {RelativeDateRenderer} from '../../renderers/relative-date-renderer';
import {Gauge} from '../gauge/gauge';

import {FactContext} from './context';
import {Fact} from './fact';
import type {FactContainer} from './types';

const meta: Meta<typeof Fact> = {
  component: Fact,
  decorators: [
    (Story) => (
      <Section>
        <Section>
          <Story />
        </Section>
      </Section>
    ),
  ],
  title: 'Data Display/Fact',
};

export default meta;

/**
 * Here's what a Check Run Reporter account page might look like rendered using
 * Facts and CSS grid,
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

  const bytesFormatter = useCallback((value: number) => {
    const {unit, val} = formatBytes(value);
    const nf = new Intl.NumberFormat('en', {
      style: 'unit',
      unit,
    });
    return nf.format(val);
  }, []);

  return (
    <>
      <style>
        {`
        .account-page-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1em;
        }

        .account-page-grid >*:nth-child(1),
        .account-page-grid >*:nth-child(2),
        .account-page-grid >*:nth-child(3),
        .account-page-grid >*:nth-child(4) {
           grid-column: span 4;
        }

        .account-page-grid >*:nth-child(1),
        .account-page-grid >*:nth-child(2) {
            grid-row: span 2;
        }

        .account-page-grid >*:nth-child(3),
        .account-page-grid >*:nth-child(4) {
            grid-row: span 1;
        }

        .account-page-grid >*:nth-child(5),
        .account-page-grid >*:nth-child(6) {
            grid-column: span 6;
        }


        .account-page-grid >*:nth-child(7) {
            grid-column: span 12;
        }

      `}
      </style>
      <div className={'account-page-grid'}>
        <Fact
          label="Submissions This Month"
          value={accountPageData.countThisMonth}
          min={0}
          max={50000}
          Renderer={Gauge}
        />
        <Fact
          label="Bytes This Month"
          value={accountPageData.bytesThisMonth}
          min={0}
          max={1024 * 1024 * 1024}
          Renderer={Gauge}
          labelFormatter={bytesFormatter}
          valueFormatter={bytesFormatter}
        />
        <Fact label="All Time Submissions" value={accountPageData.count} />
        <Fact
          label="All Time Bytes"
          value={accountPageData.bytes}
          Renderer={ByteRenderer}
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
        <Fact label="Token" value={accountPageData.token} />
      </div>
    </>
  );
};

export const BigNumber = () => (
  <Fact label="Population of San Francisco" value={815000} />
);

export const Word = () => <Fact label="Status" value="COMPLETE" />;

export const Currency = () => (
  <Fact
    label="Monthly Price"
    value={9.99}
    Renderer={CurrencyRenderer}
    currency="GBP"
  />
);

const FooterFactCard: FactContainer = ({label, output}) => (
  <Card className="fact-container fact-card">
    <Card.Body className="fact-card__value">{output}</Card.Body>
    <Card.Footer className="fact-card__label">{label}</Card.Footer>
  </Card>
);

export const AlternateContainer = () => {
  const defaults = useContext(FactContext);
  return (
    <FactContext.Provider value={{...defaults, Container: FooterFactCard}}>
      <Fact
        label="Monthly Price"
        value={9.99}
        Renderer={CurrencyRenderer}
        currency="GBP"
      />
    </FactContext.Provider>
  );
};
