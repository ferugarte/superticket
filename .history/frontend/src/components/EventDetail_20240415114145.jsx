// src/components/EventDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById, updateEvent, deleteEvent } from '../services/api';

function EventDetail() {
    const [event, setEvent] = useState(null);
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        fetchEventById(id).then(response => setEvent(response.data))
                          .catch(error => console.error('Error fetching event:', error));
    }, [id]);

    const handleDelete = () => {
        deleteEvent(id).then(() => {
            alert('Event deleted successfully');
            history.push('/');
        }).catch(error => alert('Error deleting event:', error));
    };

    const handleUpdate = () => {
        const updatedInfo = { name: 'Updated Event Name' }; // Placeholder for update
        updateEvent(id, updatedInfo).then(() => {
            alert('Event updated successfully');
            history.push('/');
        }).catch(error => alert('Error updating event:', error));
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <button onClick={handleUpdate}>Update Event</button>
            <button onClick={handleDelete}>Delete Event</button>
        </div>
    );
}

export default EventDetail;
