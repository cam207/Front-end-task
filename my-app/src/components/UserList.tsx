// components/UserList.tsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Pagination, Typography } from '@mui/material';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import { User } from './type'; // Import the User interface

const UserList: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersFound, setUsersFound] = useState(true);
  const usersPerPage = 5;

  const fetchTotalUsers = useCallback(async (query = '') => {
    try {
      const url = new URL('https://65ca334d3b05d29307dfede3.mockapi.io/users/v1/users');

      if (query) {
        url.searchParams.append('name', query);
      }

      const response = await axios.get(url.toString());
      const allUsers = response.data || [];
      const totalItems = allUsers.length;
      const calculatedTotalPages = Math.ceil(totalItems / usersPerPage);
      setTotalPages(calculatedTotalPages);

      if (totalItems === 0) {
        setFilteredUsers([]);
        setPage(1);
        setUsersFound(false);
        return;
      }

      setUsersFound(true);
      fetchData(query, page);
    } catch (error) {
      console.error('Error fetching total users', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setUsersFound(false);
        setFilteredUsers([]);
        setTotalPages(1);
        setPage(1);
      }
    }
  }, [page]);

  const fetchData = async (query = '', currentPage = 1) => {
    try {
      const url = new URL('https://65ca334d3b05d29307dfede3.mockapi.io/users/v1/users');

      if (query) {
        url.searchParams.append('search', query);
      }

      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', usersPerPage.toString());

      const response = await axios.get(url.toString());
      const data = response.data || [];
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching data', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setUsersFound(false);
        setFilteredUsers([]);
      }
    }
  };

  useEffect(() => {
    fetchTotalUsers();
  }, [fetchTotalUsers]);

  const handleSearch = () => {
    fetchTotalUsers(searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchData(searchQuery, value);
  };

  

  return (
    <Container>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchClick={handleSearch}
      />
      {!usersFound ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No user is found
        </Typography>
      ) : (
        <>
          <UserTable users={filteredUsers} />
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </>
      )}
    </Container>
  );
};

export default UserList;
