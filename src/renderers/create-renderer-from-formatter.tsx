import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';

import type {FormatterHook} from '../formatters/types';

import type {RendererWithContext} from './types';

/**
 * Creates a formatter component from a formatter hook.
 */
export function createRendererFromFormatter<
  T,
  C,
  P extends Partial<C> = Partial<C>
>(
  useFormatter: FormatterHook<T, C, P>
): RendererWithContext<
  T,
  C,
  P & {
    className?: string;
  }
> {
  const name = useFormatter.name.replace(/^use/, '').replace(/Formatter$/, '');
  const kebabName = kebabCase(name);
  const specificClassName = `renderer-${kebabName}`;

  /** @internal */
  function Formatter(props: P & {value: T; className?: string}) {
    const {className, value} = props;
    const format = useFormatter(props);
    return (
      <span className={cx('renderer', specificClassName, className)}>
        {format(value)}
      </span>
    );
  }

  Formatter.displayName = `${upperFirst(name)}Renderer`;

  return Formatter;
}
