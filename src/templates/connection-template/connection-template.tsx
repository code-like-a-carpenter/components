import React from 'react';

import {ConfigureFunction, Maybe} from '../..';
import {Stringify} from '../../stringify';
import {
  FieldWrapper as FieldWrapperType,
  ItemWrapper as ItemWrapperType,
  Wrapper as WrapperType,
} from '../support';

import {ConnectionLike, NodeLike} from './types';

export interface ConnectionTemplateProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  configure: ConfigureFunction<N>;
  Wrapper: WrapperType<Maybe<N>[]>;
  ItemWrapper: ItemWrapperType<N>;
  FieldWrapper: FieldWrapperType<N>;
}

export const ConnectionTemplate = <N extends NodeLike, PI>(
  props: ConnectionTemplateProps<N, PI>
) => <Stringify>{props}</Stringify>;
