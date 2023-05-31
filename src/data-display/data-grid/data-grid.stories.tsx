import {faker} from '@faker-js/faker';
import React from 'react';

import {DataGrid} from './data-grid';
import {DataGridItem} from './data-grid-item';

export default {
  component: DataGrid,
  title: 'Data Display/Data Grid',
};

const sizes = [1, 2, 3];

/** helper */
function rand() {
  return faker.helpers.arrayElement(sizes);
}

export const NormalGrid = () => (
  <DataGrid style={{backgroundColor: 'red'}}>
    {new Array(37).fill('x').map((_, i) => (
      <DataGridItem
        style={{
          alignItems: 'center',
          backgroundColor: 'pink',
          display: 'flex',
          justifyContent: 'center',
        }}
        key={i}
        height={rand()}
        width={rand()}
      >
        {i}
      </DataGridItem>
    ))}
  </DataGrid>
);

export const DenseColumns = () => (
  <DataGrid denseColumns style={{backgroundColor: 'red'}}>
    {new Array(37).fill('x').map((_, i) => (
      <DataGridItem
        style={{
          alignItems: 'center',
          backgroundColor: 'pink',
          display: 'flex',
          justifyContent: 'center',
        }}
        key={i}
        height={rand()}
        width={rand()}
      >
        {i}
      </DataGridItem>
    ))}
  </DataGrid>
);

export const DenseRows = () => (
  <DataGrid denseRows style={{backgroundColor: 'red'}}>
    {new Array(37).fill('x').map((_, i) => (
      <DataGridItem
        style={{
          alignItems: 'center',
          backgroundColor: 'pink',
          display: 'flex',
          justifyContent: 'center',
        }}
        key={i}
        height={rand()}
        width={rand()}
      >
        {i}
      </DataGridItem>
    ))}
  </DataGrid>
);

export const DenseColumnsAndRows = () => (
  <DataGrid denseColumns denseRows style={{backgroundColor: 'red'}}>
    {new Array(37).fill('x').map((_, i) => (
      <DataGridItem
        style={{
          alignItems: 'center',
          backgroundColor: 'pink',
          display: 'flex',
          justifyContent: 'center',
        }}
        key={i}
        height={rand()}
        width={rand()}
      >
        {i}
      </DataGridItem>
    ))}
  </DataGrid>
);
