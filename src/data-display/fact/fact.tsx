import {ReactNode} from 'react';

import {Renderer as RendererType} from '../../renderers';
import {useContextWithDefaults} from '../../support';

import {FactContext, FactContextProps} from './context';

export interface FactProps<T>
  extends Partial<Omit<FactContextProps, 'Renderer'>> {
  label: ReactNode;
  value: T;
  Renderer?: RendererType<T>;
}

export const Fact = <T extends unknown>({
  label,
  value,
  Renderer: OverrideRenderer,
  ...rest
}: FactProps<T>) => {
  const {Container, Renderer: DefaultRenderer} = useContextWithDefaults(
    FactContext,
    rest
  );
  const Renderer = OverrideRenderer ?? DefaultRenderer;

  return (
    <>
      <Container label={label} output={<Renderer value={value} />}></Container>
    </>
  );
};
