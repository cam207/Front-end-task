import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import axios from 'axios';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string; // Pass userId as prop to identify which user to delete
  refreshUsers: () => void; // Add refreshUsers prop
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  userId,
  refreshUsers, // Add refreshUsers prop
}) => {
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://65ca334d3b05d29307dfede3.mockapi.io/users/v1/users/${userId}`);
      refreshUsers(); // Call refreshUsers to fetch updated user list
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error deleting user', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this user?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          style={{ color: 'red' }} // Set the text color to red
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
