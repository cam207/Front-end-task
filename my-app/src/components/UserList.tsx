import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Pagination, Typography, PaginationItem } from '@mui/material';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import { User } from './type';

const UserList: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [usersFound, setUsersFound] = useState(true);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const usersPerPage = 5;

  const fetchData = useCallback(async (query = '', currentPage = 1) => {
    try {
      const url = new URL('https://65ca334d3b05d29307dfede3.mockapi.io/users/v1/users');

      if (query) {
        url.searchParams.append('name', query);
      }

      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', usersPerPage.toString());

      const response = await axios.get(url.toString());
      const data = response.data || [];
      setFilteredUsers(data);

      if (data.length === 0) {
        if (currentPage > 1) {
          setHasMoreUsers(false);
          return;
        } else {
          setUsersFound(false);
        }
      } else {
        setUsersFound(true);
        setHasMoreUsers(data.length === usersPerPage);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setUsersFound(false);
        setFilteredUsers([]);
      }
    }
  }, []);

  useEffect(() => {
    fetchData(searchQuery, page);
  }, [fetchData, searchQuery, page]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(searchTerm);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value > page && !hasMoreUsers) {
      return;
    }
    setPage(value);
  };

  const refreshUsers = () => {
    fetchData(searchQuery, page);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the website
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Find below who you're searching for
      </Typography>
      <SearchBar
        searchQuery={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchClick={handleSearch}
      />
      {!usersFound ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No user is found
        </Typography>
      ) : (
        <>
          <UserTable users={filteredUsers} refreshUsers={refreshUsers} />
          <Pagination
            count={page + (filteredUsers.length === usersPerPage ? 1 : 0)}
            page={page}
            onChange={handlePageChange}
            siblingCount={0}
            boundaryCount={0}
            renderItem={(item) => {
              if (item.type === 'previous' || item.type === 'next') {
                return (
                  <PaginationItem
                    {...item}
                    disabled={
                      (item.type === 'previous' && page === 1) ||
                      (item.type === 'next' && !hasMoreUsers)
                    }
                  />
                );
              }
              return null;
            }}
          />
        </>
      )}
    </Container>
  );
};

export default UserList;
