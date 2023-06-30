import type {FormatterHook} from '../formatters/types';

import type {RendererWithContext} from './types';

/**
 * Creates a formatter component from a formatter hook.
 */
export function createRendererFromFormatter<
  T,
  C,
  P extends Partial<C> = Partial<C>
>(useFormatter: FormatterHook<T, C, P>): RendererWithContext<T, C, P> {
  /** @internal */
  function Formatter(props: P & {value: T}) {
    const {value} = props;
    const format = useFormatter(props);
    return <>{format(value)}</>;
  }

  Formatter.displayName = `Formatter(${useFormatter.name})`;

  return Formatter;
}
