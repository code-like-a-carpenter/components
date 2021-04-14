import React from 'react';

import {ConnectionLike, IdType, Maybe, NodeLike, useEdgeNodes} from '../..';
import {
  ConfigureFunction,
  Configurer,
  FieldConfigurationProvider,
} from '../configuration';
import {UnboundArrayTemplate} from '../array-template';
import {
  FieldWrapper as FieldWrapperType,
  ItemWrapper as ItemWrapperType,
  Wrapper as WrapperType,
} from '../support';

export interface ConnectionTemplateProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  configure: ConfigureFunction<N>;
  Wrapper: WrapperType<Maybe<N>[]>;
  ItemWrapper: ItemWrapperType<N>;
  FieldWrapper: FieldWrapperType<N>;
}

export const ConnectionTemplate = <N extends NodeLike, PI>({
  connection,
  ...rest
}: ConnectionTemplateProps<N, PI>) => {
  const nodes = useEdgeNodes(connection?.edges);

  // @ts-expect-error - tsc can't tell that "id" is a key of N rather than just
  // an arbitrary string. If I use NodeLike instead of N, it works.
  const idField: IdType<N> = 'id';

  return <ArrayTemplate idField={idField} data={nodes} {...rest} />;
};
