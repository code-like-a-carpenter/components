import React, {HTMLProps} from 'react';

export type TableHeaderProps = HTMLProps<HTMLTableSectionElement>;

export const TableHeader = (props: TableHeaderProps) => {
  return <thead {...props} />;
};
