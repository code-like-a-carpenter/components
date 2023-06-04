import {CurrencyRenderer} from '../renderers';

import {Description} from './description';

export default {
  component: Description,
  title: 'Description/Description',
};

export const Default = () => (
  <Description term="Term" description="Its Description" />
);

export const MultipleDescriptions = () => (
  <Description
    term="Term"
    description={[
      <div key={1}>Its description</div>,
      <div key={2}>Its second description</div>,
    ]}
  />
);

export const WithCustomizedRenderer = () => (
  <Description
    term="Household Income"
    Renderer={CurrencyRenderer}
    currency="GBP"
    description={100000}
  />
);

export const WithDate = () => (
  <Description term="Created At" description={new Date('2021-01-01')} />
);
