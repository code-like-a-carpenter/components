import React from 'react';

import {ConnectionLike, IdType, Maybe, NodeLike, useEdgeNodes} from '../..';
import {
  ConfigureFunction,
  Configurer,
  FieldConfigurationProvider,
} from '../configuration';
import {UnboundArrayTemplate} from '../array-template';
import {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from '../support';

export interface ConnectionTemplateProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  configure: ConfigureFunction<N>;
  TemplateWrapper: TemplateWrapperType<Maybe<N>[]>;
  ItemWrapper: ItemWrapperType<N>;
  FieldWrapper: FieldWrapperType<N>;
}

export type UnboundConnectionTemplateProps<N extends NodeLike, PI> = Omit<
  ConnectionTemplateProps<N, PI>,
  'configure'
>;

export const UnboundConnectionTemplate = <N extends NodeLike, PI>({
  connection,
  ...rest
}: UnboundConnectionTemplateProps<N, PI>) => {
  const nodes = useEdgeNodes(connection?.edges);

  // @ts-expect-error - tsc can't tell that "id" is a key of N rather than just
  // an arbitrary string. If I use NodeLike instead of N, it works.
  const idField: IdType<N> = 'id';

  return <UnboundArrayTemplate idField={idField} data={nodes} {...rest} />;
};

export const ConnectionTemplate = <N extends NodeLike, PI>({
  configure: Configure,
  ...rest
}: ConnectionTemplateProps<N, PI>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={Configurer} />
    <UnboundConnectionTemplate {...rest} />
  </FieldConfigurationProvider>
);
