// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/api';
import { List, ListItem, ListItemText, Button, Paper } from '@material-ui/core';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents().then(response => setEvents(response.data))
                     .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <h1>Events</h1>
            <List>
                {events.map(event => (
                    <ListItem key={event._id} button component={Link} to={`/events/${event._id}`}>
                        <ListItemText primary={event.name} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" component={Link} to="/create-event">
                Add Event
            </Button>
        </Paper>
    );
}

export default EventList;
