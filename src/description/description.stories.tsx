import React from 'react';

import {Description} from './description';

export default {
  component: Description,
  title: 'Description/Description',
};

export const description = () => (
  <Description term="Term" description="Its Description" />
);

export const multipleDescriptions = () => (
  <Description
    term="Term"
    description={[
      <div key={1}>Its description</div>,
      <div key={2}>Its second description</div>,
    ]}
  />
);

export const children = () => (
  <Description term="Term">
    <div>Its description</div>
    <div>Its second description</div>
  </Description>
);
