import {DateTime} from 'luxon';

import {AnyRenderer, AnyRendererContext} from './any-renderer';

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
const overrides = {
  boolean: {
    no: 'nosiree',
    yes: 'you got it',
  },
  date: {
    format: DateTime.DATETIME_SHORT,
  },
  null: {
    null: 'nothing to see here',
  },
};
export const ReactNode = () => <AnyRenderer value={<p>foo</p>} />;

export const WithOverrides = () => (
  <table>
    <tr>
      <th>string</th>
      <td>
        <AnyRenderer {...overrides} value={'foo'} />
      </td>
    </tr>
    <tr>
      <th>boolean</th>
      <td>
        <AnyRenderer {...overrides} value={true} />
      </td>
    </tr>
    <tr>
      <th>date</th>
      <td>
        <AnyRenderer {...overrides} value={new Date('2020-01-01')} />
      </td>
    </tr>
    <tr>
      <th>number</th>
      <td>
        <AnyRenderer {...overrides} value={5} />
      </td>
    </tr>
    <tr>
      <th>null</th>
      <td>
        <AnyRenderer {...overrides} value={null} />
      </td>
    </tr>
  </table>
);

export const WithOverridesFromContext = () => (
  <AnyRendererContext.Provider value={overrides}>
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
  </AnyRendererContext.Provider>
);
