import React, {HTMLProps} from 'react';

export type TableRowProps = HTMLProps<HTMLTableRowElement>;

export const TableRow = (props: TableRowProps) => {
  return <tr {...props} />;
};
