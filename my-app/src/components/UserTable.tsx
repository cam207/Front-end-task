import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserRow from './UserRow';
import { User } from './type';

interface UserTableProps {
  users: User[];
  refreshUsers: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, refreshUsers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>ID</TableCell>
            <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>Name</TableCell>
            <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>Avatar</TableCell>
            <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>Created At</TableCell>
            <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} refreshUsers={refreshUsers} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
