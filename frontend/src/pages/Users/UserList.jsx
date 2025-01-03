import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Button,
    Typography,
    Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../utils/api';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const columns = [
        { field: 'us_id', headerName: 'ID', width: 130 },
        { field: 'us_name', headerName: 'Name', width: 130 },
        { field: 'us_email', headerName: 'Email', width: 200 },
        { field: 'us_phone_number', headerName: 'Phone', width: 130 },
        { field: 'us_address', headerName: 'Address', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/users/${params.row.us_id}`)}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.us_id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Container>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Users</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/users/new')}
                >
                    Add User
                </Button>
            </Box>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.us_id}
                    disableSelectionOnClick
                />
            </Paper>
        </Container>
    );
};

export default UserList;