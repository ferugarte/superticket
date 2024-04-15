// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../services/api';

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
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEvent;
