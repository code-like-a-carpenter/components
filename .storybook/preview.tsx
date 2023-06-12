import './styles.scss'

import {faker} from '@faker-js/faker';

const seed = 1701;
// set the seed to ensure data generated outside of stories is consistent
faker.seed(seed);

export const decorators = [
  (Story) => {
    // set the seed again to ensure data generated within each story starts from
    // the same seed
    faker.seed(seed);
    return <Story />;
  },
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
};
