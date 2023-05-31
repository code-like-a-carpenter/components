import {ComponentProps, ReactNode} from 'react';

import {Renderer} from '../../renderers';
import {useContextWithPropOverrides} from '../../support';

import {FactContext, FactContextProps} from './context';

export type FactProps<
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C>
> = {
  label: ReactNode;
  value: T;
  Renderer?: R;
} & ComponentProps<R> &
  Partial<FactContextProps>;

export const Fact = <
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C>
>({
  label,
  value,
  ...rest
}: FactProps<T, C, R>) => {
  const {
    Container,
    Renderer: Component,
    ...rendererProps
    // @ts-expect-error
  } = useContextWithPropOverrides(FactContext, rest);

  return (
    <>
      <Container
        label={label}
        output={<Component value={value} {...rendererProps} />}
      />
    </>
  );
};
