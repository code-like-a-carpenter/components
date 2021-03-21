import React from 'react';

import {Stringify} from './stringify';

export default {
  component: Stringify,
  title: 'Components/Stringify',
};

export const stringify = () => <Stringify>{{proof: true}}</Stringify>;
