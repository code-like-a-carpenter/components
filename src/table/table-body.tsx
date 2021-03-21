import React, {HTMLProps} from 'react';

export type TableBodyProps = HTMLProps<HTMLTableSectionElement>;

export const TableBody = (props: TableBodyProps) => {
  return <tbody {...props} />;
};
