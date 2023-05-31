import {ElementType, ReactElement, ReactNode} from 'react';

import {Definitely, FieldWrapperProps, IdType, Maybe} from '../..';
import {Renderer} from '../../renderers';

import {FieldConfigurationProvider} from './configuration';
import {useConfigureField} from './hooks';

export interface ConfigureFunctionProps<T extends object> {
  FieldConfigurer: <T2 extends T, K2 extends IdType<T2>>(
    props: ConfigurerProps<T2, K2>
  ) => ReactElement | null;
}

export interface ConfigureFunction<T extends object> {
  (props: ConfigureFunctionProps<T>): ReactElement | null;
}

export interface ConfigurerProps<T extends object, K extends IdType<T>> {
  field: K;
  label?: ReactNode | Renderer<K>;
  renderer?: Renderer<T[K]>;
  wrapper?: ElementType<FieldWrapperProps<T, K>>;
  configure?: T[K] extends Maybe<object>
    ? ElementType<ConfigureFunctionProps<Definitely<T[K]>>>
    : never;
}

export const Configurer = <T extends object, K extends IdType<T>>({
  field,
  configure: Configure,
  ...rest
}: ConfigurerProps<T, K>) => {
  const configure = useConfigureField();

  if (Configure) {
    return (
      <FieldConfigurationProvider field={field}>
        {/* I'm pretty sure this has something to do with the possibility of
            encountering the never case described in ConfigurerProps#configure.
            Since this is library code and consumers are never effected by this
            type, I'm not concerned with suppressing it. */}
        {/* @ts-expect-error */}
        <Configure FieldConfigurer={Configurer} />
      </FieldConfigurationProvider>
    );
  }

  // @ts-expect-error - thanks to various templates, rest has a renderprop with
  // a specific prop shape while configure expects it to accept an unknown.
  configure(field, rest);

  return null;
};
