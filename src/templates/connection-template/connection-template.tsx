import type {ReactElement} from 'react';

import type {ConnectionLike, IdType, Maybe, NodeLike} from '../..';
import {useEdgeNodes} from '../..';
import {ArrayTemplate} from '../array-template';
import type {ConfigureFunction} from '../configuration';
import type {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from '../support';

export interface ConnectionTemplateProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  configure?: ConfigureFunction<N>;
  TemplateWrapper?: TemplateWrapperType<Maybe<N>[]>;
  ItemWrapper?: ItemWrapperType<N>;
  FieldWrapper?: FieldWrapperType<N>;
  noDataSlot?: ReactElement;
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
