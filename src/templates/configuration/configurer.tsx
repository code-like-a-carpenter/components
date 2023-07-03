import type {Choose, Path} from '../..';
import type {Renderer} from '../../renderers';

import type {ConfigureComponentProps} from './configurable';
import {FieldConfigurationProvider} from './configuration';
import {useConfigureField} from './hooks';

export const Configurer = <
  T extends Record<string | number, any>,
  K extends Path<T>,
  R extends Renderer<Choose<T, K>>
>({
  field,
  configure: Configure,
  ...rest
}: ConfigureComponentProps<T, K, R>) => {
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
