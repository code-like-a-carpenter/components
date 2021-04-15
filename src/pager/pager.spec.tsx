import {render} from '@testing-library/react';
import React from 'react';

import {InstallationPageQuery} from '../sample-types';

import {Pager} from '.';

describe('Pager', () => {
  it('infers types for real-world examples', () => {
    const data = ((): InstallationPageQuery => ({}))();

    render(
      <Pager pageInfo={data?.installation?.repositoryConnection?.pageInfo} />
    );
  });
});
