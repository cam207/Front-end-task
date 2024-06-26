import React, { useState } from 'react';
import { TableCell, TableRow, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from './Avatar';
import ConfirmationDialog from './ConfirmationDialog';
import EditDialog from './EditDialog';
import { User } from './type';

interface UserRowProps {
  user: User;
  refreshUsers: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, refreshUsers }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-GB');

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  return (
    <TableRow>
      <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>{currentUser.id}</TableCell>
      <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>{currentUser.name}</TableCell>
      <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
        <Avatar src={currentUser.avatar} alt={currentUser.name} />
      </TableCell>
      <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>{formattedDate}</TableCell>
      <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteClick}
              style={{ backgroundColor: 'red', color: 'white' }}
              endIcon={<DeleteIcon />}
            >
              Delete User
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} userId={currentUser.id} refreshUsers={refreshUsers} />
      <EditDialog open={editDialogOpen} onClose={handleCloseEditDialog} user={currentUser} onUserUpdated={handleUserUpdated} />
    </TableRow>
  );
};

export default UserRow;
