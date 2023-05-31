import {AnyRenderer} from '..';
import {makeComplexPeople, makeSimplePeople} from '../mocks';

import {
  Table,
  TableHeader,
  TableBody,
  TableBodyCell,
  TableRow,
  TableHeaderCell,
} from './table';

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
