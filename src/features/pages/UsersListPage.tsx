import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Box,
    TextField,
} from '@mui/material';
import { useGetUsersQuery } from '../users/usersApi';

export default function UsersListPage() {
    const { data, isLoading, isError, error } = useGetUsersQuery();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !data) {
        console.error(error);
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error" variant="h6" align="center">
                    Failed to load users.
                </Typography>
            </Box>
        );
    }

    const filteredUsers = data.users.filter((user) =>
        Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Users List
            </Typography>
            <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    maxHeight: '500px',
                    overflowY: 'auto'
                }}
                elevation={8}
            >
                <Table stickyHeader sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '20%', backgroundColor: 'background.paper' }}>
                                First Name
                            </TableCell>
                            <TableCell sx={{ width: '20%', backgroundColor: 'background.paper' }}>
                                Last Name
                            </TableCell>
                            <TableCell sx={{ width: '15%', backgroundColor: 'background.paper' }}>
                                Age
                            </TableCell>
                            <TableCell sx={{ width: '25%', backgroundColor: 'background.paper' }}>
                                Email
                            </TableCell>
                            <TableCell sx={{ width: '20%', backgroundColor: 'background.paper' }}>
                                Username
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                onClick={() => navigate(`/users/${user.id}`)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}