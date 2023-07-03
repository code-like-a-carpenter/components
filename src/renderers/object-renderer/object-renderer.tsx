import cx from 'classnames';

import {Code} from '../../code';
import type {ObjectFormatterContextProps} from '../../formatters';
import {useObjectFormatter} from '../../formatters';
import type {RendererPropsFromContext} from '../types';

export const ObjectRenderer = ({
  value,
  className,
  ...rest
}: RendererPropsFromContext<
  any,
  ObjectFormatterContextProps,
  Partial<ObjectFormatterContextProps> & {
    className?: string;
  }
>) => {
  const formatter = useObjectFormatter(rest);
  return (
    <Code
      className={cx(className, 'renderer', 'renderer-object')}
      dedent={false}
    >
      {formatter(value)}
    </Code>
  );
};
