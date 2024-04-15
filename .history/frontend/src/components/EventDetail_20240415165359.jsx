import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Container, Button } from '@mui/material';

function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/events/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch event details');
                setLoading(false);
                console.error(err);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm">
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" component="h1" style={{ marginBottom: '20px' }}>
                {event.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '20px' }}>
                {event.description}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '20px' }}>
                Date: {new Date(event.date).toLocaleDateString()} at {event.time}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '20px' }}>
                Location: {event.location.lat}, {event.location.lng}
            </Typography>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Zones:
            </Typography>
            <List>
                {event.zones.map((zone, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText
                                primary={zone.name}
                                secondary={`Price: $${zone.price}, Capacity: ${zone.capacity}`}
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
            <Button variant="contained" onClick={() => navigate('/events')} style={{ marginRight: '10px' }}>
                Back to Event List
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate(`/events/${id}/tickets`)}>
                View Tickets
            </Button>
        </Paper>
        </Container>
    );
}

export default EventDetail;
