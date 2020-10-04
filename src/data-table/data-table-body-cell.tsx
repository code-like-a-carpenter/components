import React from 'react';

import {TableBodyCell} from '..';

import {useColummnConfiguration} from './column-configuration';

export type DataTableBodyCellProps<T = unknown> = {
  name: string;
  value: T;
};

export const DataTableBodyCell = <T extends unknown = unknown>({
  name,
  value,
}: DataTableBodyCellProps<T>) => {
  const {renderer: Renderer} = useColummnConfiguration(name);
  return (
    <TableBodyCell>
      <Renderer value={value} />
    </TableBodyCell>
  );
};
