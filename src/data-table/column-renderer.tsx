import {useConfigureColumn} from './column-configuration';
import {FieldRendererProps, IdType} from './types';

export const ColumnRenderer = <T extends object, K extends IdType<T>>({
  name,
  label,
}: FieldRendererProps<T, K>) => {
  const configure = useConfigureColumn();

  configure(name, {label});

  return null;
};
