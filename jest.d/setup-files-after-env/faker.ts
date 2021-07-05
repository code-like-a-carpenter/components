import faker from 'faker';

// Seed once for the mocks that are generated outside of test blocks. This
// particularly applies to mocks that are generated in story files but not in
// story functions.
faker.seed(1701);

beforeEach(() => {
  // Reset the seed before every test so that add a new test/story doesn't alter
  // unrelated mocks.
  faker.seed(1701);
});
