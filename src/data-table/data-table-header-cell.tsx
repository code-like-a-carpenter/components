import React from 'react';

import {TableHeaderCell} from '..';

import {useColummnConfiguration} from './column-configuration';

export type DataTableHeaderCellProps = {
  name: string;
};

export const DataTableHeaderCell = ({name}: DataTableHeaderCellProps) => {
  const {label} = useColummnConfiguration(name);
  return <TableHeaderCell>{label}</TableHeaderCell>;
};
