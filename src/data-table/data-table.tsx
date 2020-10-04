import React from 'react';

import {RenderProps} from './types';

export type DataTableProps<T extends object> = {
  data: T[];
  render: React.ComponentType<RenderProps<T>>;
};

export const DataTable = <T extends object>(props: DataTableProps<T>) => (
  <>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </>
);
