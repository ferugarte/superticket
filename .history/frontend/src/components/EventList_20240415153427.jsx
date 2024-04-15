// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText } from '@mui/material';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <Container maxWidth="sm">
        <List>
            {events.map(event => (
                <ListItem key={event._id}>
                    <ListItemText primary={event.name} />
                    <Button component={Link} to={`/events/${event._id}`}>View Details</Button>
                </ListItem>
            ))}
        </List>
        </Container>
    );
}

export default EventList;
