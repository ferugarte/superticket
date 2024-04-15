// src/components/EventDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/events/${id}`)
            .then(response => setEvent(response.data))
            .catch(error => console.error('Error fetching event details:', error));
    }, [id]);

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            {/* Implement update and delete functionality as needed */}
        </div>
    );
}

export default EventDetail;
