import React, {HTMLProps} from 'react';

export type TableHeaderCellProps = HTMLProps<HTMLTableHeaderCellElement>;

export const TableHeaderCell = (props: TableHeaderCellProps) => {
  return <th {...props} />;
};
