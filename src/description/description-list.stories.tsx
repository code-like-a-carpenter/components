import {makeSimplePerson} from '../mocks';
import {CurrencyRenderer} from '../renderers';

import {Description} from './description';
import {DescriptionList} from './description-list';

export default {
  component: DescriptionList,
  title: 'Description/DescriptionList',
};

export const Default = () => (
  <DescriptionList>
    <Description term="Term" description="Its Description" />
  </DescriptionList>
);

export const List = () => (
  <DescriptionList>
    <Description term="Term 1" description="Its Description" />
    <Description term="Term 2" description="Its Description" />
    <Description term="Term 3" description="Its Description" />
    <Description term="Term 4" description="Its Description" />
  </DescriptionList>
);

export const ListWithCustomizedRenderer = () => {
  const person = makeSimplePerson();
  return (
    <DescriptionList>
      <Description term="First Name" description={person.firstName} />
      <Description term="Last Name" description={person.lastName} />
      <Description
        term="Household Income"
        Renderer={CurrencyRenderer}
        currency="GBP"
        description={person.householdIncome}
      ></Description>
    </DescriptionList>
  );
};
