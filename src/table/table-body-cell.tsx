import React, {HTMLProps} from 'react';

export type TableBodyCellProps = HTMLProps<HTMLTableCellElement>;

export const TableBodyCell = (props: TableBodyCellProps) => {
  return <td {...props} />;
};
