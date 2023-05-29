import './styles.scss'

import {faker} from '@faker-js/faker';

export const decorators = [
  (Story) => {
    faker.seed(1701);
    return <Story />;
  },
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
};
