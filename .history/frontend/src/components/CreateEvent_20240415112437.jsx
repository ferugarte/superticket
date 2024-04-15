// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../services/api';
import { TextField, Button, Paper } from '@material-ui/core';

function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { name, description };
        createEvent(eventData).then(() => {
            alert('Event created successfully');
            history.push('/');
        }).catch(error => alert('Error creating event:', error));
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </form>
        </Paper>
    );
}

export default CreateEvent;
