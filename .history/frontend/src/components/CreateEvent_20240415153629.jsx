// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/events', { name, description })
            .then(() => alert('Event created successfully!'))
            .catch(error => alert('Error creating event:', error));
    };

    return (
        <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
            />
            <TextField
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
            />
            <Button type="submit" color="primary" variant="contained">Create Event</Button>
        </form>
        </Container>
    );
}

export default CreateEvent;
