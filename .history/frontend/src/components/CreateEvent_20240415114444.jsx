// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { createEvent } from '../services/api';
import { TextField, Button, Paper, Typography } from '@material-ui/core';

function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // use useNavigate for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { name, description };
        createEvent(eventData).then(() => {
            alert('Event created successfully');
            navigate('/'); // Use navigate with the path as argument
        }).catch(error => {
            alert('Error creating event:', error);
        });
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Typography variant="h4" component="h1">Create Event</Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create
                </Button>
            </form>
        </Paper>
    );
}

export default CreateEvent;
