// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Container } from '@mui/material';

function EventList() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const handleCreateNewEvent = () => {
        navigate('/create-event'); // Assuming '/create-event' is the route for creating a new event
    };

    useEffect(() => {
        axios.get('https://superticket-backend.uc.r.appspot.com/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <Container maxWidth="sm">
        <List>
            {events.map(event => (
                <ListItem key={event._id}>
                    <ListItemText primary={event.name} />
                    <Button component={Link} to={`/events/${event._id}`}>Ver Detalles</Button>
                </ListItem>
            ))}
        </List>        
        <Button variant="contained" color="primary" onClick={handleCreateNewEvent} fullWidth>
                Crear Nuevo Evento
            </Button>
        </Container>
    );
}

export default EventList;
