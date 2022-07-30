import React from 'react';

import {Description} from './description';
import {DescriptionList} from './description-list';

export default {
  component: DescriptionList,
  title: 'Description/DescriptionList',
};

export const descriptionList = () => (
  <DescriptionList>
    <Description term="Term" description="Its Description" />
  </DescriptionList>
);

export const list = () => (
  <DescriptionList>
    <Description term="Term 1" description="Its Description" />
    <Description term="Term 2" description="Its Description" />
    <Description term="Term 3" description="Its Description" />
    <Description term="Term 4" description="Its Description" />
  </DescriptionList>
);

export const listWithMultipleDescriptions = () => (
  <DescriptionList>
    <Description term="Term 1">Its First Description</Description>
    <Description term="Term 2">Its First Description</Description>
    <Description term="Term 3">
      <div>Its First Description</div>
      <div>Its Second Description</div>
    </Description>
    <Description term="Term 4">Its First Description</Description>
  </DescriptionList>
);
