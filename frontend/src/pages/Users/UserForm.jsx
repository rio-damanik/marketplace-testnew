import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser, register } from '../../utils/api';

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        us_name: '',
        us_email: '',
        us_password: '',
        us_phone_number: '',
        us_address: ''
    });

    useEffect(() => {
        if (id && id !== 'new') {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await getUser(id);
            const userData = response.data.data;
            setFormData({
                ...userData,
                us_password: '' // Don't show password
            });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id === 'new') {
                await register(formData);
            } else {
                await updateUser(id, formData);
            }
            navigate('/users');
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {id === 'new' ? 'Create User' : 'Edit User'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        value={formData.us_name}
                        onChange={(e) => setFormData({ ...formData, us_name: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.us_email}
                        onChange={(e) => setFormData({ ...formData, us_email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required={id === 'new'}
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.us_password}
                        onChange={(e) => setFormData({ ...formData, us_password: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        value={formData.us_phone_number}
                        onChange={(e) => setFormData({ ...formData, us_phone_number: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Address"
                        multiline
                        rows={3}
                        value={formData.us_address}
                        onChange={(e) => setFormData({ ...formData, us_address: e.target.value })}
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            fullWidth
                            onClick={() => navigate('/users')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserForm;