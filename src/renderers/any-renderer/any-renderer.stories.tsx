import {DateTime} from 'luxon';

import {
  BooleanFormatterContext,
  DateFormatterContext,
  NullFormatterContext,
} from '../../formatters';

import {AnyRenderer} from './any-renderer';

export default {
  component: AnyRenderer,
  title: 'Renderers/AnyRenderer',
};

export const Default = () => <AnyRenderer value={null} />;
export const String = () => <AnyRenderer value={'foo'} />;
export const BooleanTrue = () => <AnyRenderer value={true} />;
export const BooleanFalse = () => <AnyRenderer value={false} />;
export const DateObject = () => <AnyRenderer value={new Date('2020-01-01')} />;
export const DateString = () => <AnyRenderer value="2020-01-01" />;
export const Number = () => <AnyRenderer value={5} />;
export const Array = () => (
  <AnyRenderer value={['foo', true, false, new Date('2020-01-01')]} />
);
export const Obj = () => (
  <AnyRenderer
    value={{
      array: ['foo', true, false, new Date('2020-01-01')],
      date: new Date('2020-01-01'),
      false: false,
      foo: 'foo',
      true: true,
    }}
  />
);

export const ReactNode = () => <AnyRenderer value={<p>foo</p>} />;

const booleanOverrides = {
  no: 'nosiree',
  yes: 'you got it',
};

const dateOverrides = DateTime.DATETIME_SHORT;

const nullOverrides = {
  null: 'nothing to see here',
};

export const WithOverrides = () => (
  <table>
    <tr>
      <th>string</th>
      <td>
        <AnyRenderer
          {...booleanOverrides}
          {...dateOverrides}
          {...nullOverrides}
          value={'foo'}
        />
      </td>
    </tr>
    <tr>
      <th>boolean</th>
      <td>
        <AnyRenderer
          {...booleanOverrides}
          {...dateOverrides}
          {...nullOverrides}
          value={true}
        />
      </td>
    </tr>
    <tr>
      <th>date</th>
      <td>
        <AnyRenderer
          {...booleanOverrides}
          {...dateOverrides}
          {...nullOverrides}
          value={new Date('2020-01-01')}
        />
      </td>
    </tr>
    <tr>
      <th>number</th>
      <td>
        <AnyRenderer
          {...booleanOverrides}
          {...dateOverrides}
          {...nullOverrides}
          value={5}
        />
      </td>
    </tr>
    <tr>
      <th>null</th>
      <td>
        <AnyRenderer
          {...booleanOverrides}
          {...dateOverrides}
          {...nullOverrides}
          value={null}
        />
      </td>
    </tr>
  </table>
);

export const WithOverridesFromContext = () => (
  <BooleanFormatterContext.Provider value={booleanOverrides}>
    <DateFormatterContext.Provider value={dateOverrides}>
      <NullFormatterContext.Provider value={nullOverrides}>
        <table>
          <tr>
            <th>string</th>
            <td>
              <AnyRenderer value={'foo'} />
            </td>
          </tr>
          <tr>
            <th>boolean</th>
            <td>
              <AnyRenderer value={true} />
            </td>
          </tr>
          <tr>
            <th>date</th>
            <td>
              <AnyRenderer value={new Date('2020-01-01')} />
            </td>
          </tr>
          <tr>
            <th>number</th>
            <td>
              <AnyRenderer value={5} />
            </td>
          </tr>
          <tr>
            <th>null</th>
            <td>
              <AnyRenderer value={null} />
            </td>
          </tr>
        </table>
      </NullFormatterContext.Provider>
    </DateFormatterContext.Provider>
  </BooleanFormatterContext.Provider>
);
