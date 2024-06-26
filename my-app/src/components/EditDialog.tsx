// components/EditDialog.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';
import { User } from './type';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, user, onUserUpdated }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  useEffect(() => {
    setName(user.name);
    setAvatar(user.avatar);
  }, [user]);

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`https://65ca334d3b05d29307dfede3.mockapi.io/users/v1/users/${user.id}`, {
        name,
        avatar,
      });
      onUserUpdated(response.data); // Propagate the update to the parent component
      onClose();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Avatar URL"
          type="text"
          fullWidth
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateUser} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
