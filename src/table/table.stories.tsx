import React from 'react';

import {AnyRenderer} from '..';
import {makeComplexPeople, makeSimplePeople} from '../mocks';

import {Table} from './table';
import {TableHeader} from './table-header';
import {TableBody} from './table-body';
import {TableBodyCell} from './table-body-cell';
import {TableRow} from './table-row';
import {TableHeaderCell} from './table-header-cell';

export default {
  component: Table,
  title: 'Components/Table',
};

const simpleData = makeSimplePeople();

export const table = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>First Name</TableHeaderCell>
        <TableHeaderCell>Last Name</TableHeaderCell>
        <TableHeaderCell>Age</TableHeaderCell>
        <TableHeaderCell>Sign Up Date</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {simpleData.map(({age, firstName, lastName, signUpDate}) => (
        <TableRow key={`${firstName}${lastName}${age}`}>
          <TableBodyCell>{firstName}</TableBodyCell>
          <TableBodyCell>{lastName}</TableBodyCell>
          <TableBodyCell>{age}</TableBodyCell>
          <TableBodyCell>
            <AnyRenderer value={signUpDate} />
          </TableBodyCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const complexData = makeComplexPeople();

export const complexTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>First Name</TableHeaderCell>
        <TableHeaderCell>Last Name</TableHeaderCell>
        <TableHeaderCell>Age</TableHeaderCell>
        <TableHeaderCell>Sign Up Date</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {complexData.map(
        ({age, name: {first: firstName, last: lastName}, signUpDate}) => (
          <TableRow key={`${firstName}${lastName}${age}`}>
            <TableBodyCell>{firstName}</TableBodyCell>
            <TableBodyCell>{lastName}</TableBodyCell>
            <TableBodyCell>{age}</TableBodyCell>
            <TableBodyCell>
              <AnyRenderer value={signUpDate} />
            </TableBodyCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);
