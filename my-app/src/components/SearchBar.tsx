// components/SearchBar.tsx
import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, onSearchClick }) => {
  return (
    <TextField
      label="Search by name"
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={onSearchClick}
              style={{
                backgroundColor: '#1a73e8', // Blue background color
                color: '#ffffff', // White text color
                borderRadius: '4px', // Square corners
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
