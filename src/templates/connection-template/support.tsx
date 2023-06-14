import type {IdType, Maybe, NodeLike} from '../..';
import {useFieldConfiguration} from '../configuration';
import type {
  FieldWrapperProps,
  ItemWrapperProps,
  TemplateWrapperProps,
} from '../support';

export const ItemWrapper = <T extends object>({
  children,
}: ItemWrapperProps<T>) => (
  <li>
    <ul>{children}</ul>
  </li>
);

export const Wrapper = <T extends unknown>({
  children,
}: TemplateWrapperProps<Maybe<T[]>>) => <ul>{children}</ul>;

export const FieldWrapper = <T extends object, K extends IdType<T>>({
  fieldId,
  children,
}: FieldWrapperProps<T, K>) => {
  const {label} = useFieldConfiguration(fieldId);

  return (
    <li>
      {label}: {children}
    </li>
  );
};

// eslint-disable-next-line require-jsdoc
export function toConnection<N extends NodeLike>(nodes: N[]) {
  const edges = nodes.map(toEdge);
  return {
    edges,
    pageInfo: {
      endCursor: edges[edges.length - 1].cursor,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: edges[0].cursor,
    },
  };
}

// eslint-disable-next-line require-jsdoc
function toEdge<N extends NodeLike>(node: N, index: number) {
  // Note that this demo just displays indexes directly for debugging purposes,
  // but these will not typically be numbers
  return {
    cursor: String(index),
    node,
  };
}
