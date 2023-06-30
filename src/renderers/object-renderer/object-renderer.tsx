import {Code} from '../../code';
import type {ObjectFormatterContextProps} from '../../formatters';
import {useObjectFormatter} from '../../formatters';
import type {RendererPropsFromContext} from '../types';

export const ObjectRenderer = ({
  value,
  ...rest
}: RendererProps<any, ObjectFormatterContextProps>) => {
  const formatter = useObjectFormatter(rest);
  return <Code dedent={false}>{formatter(value)}</Code>;
};
