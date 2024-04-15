import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Container, Button, Grid } from '@mui/material';

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

    const deleteEvent = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/events/${id}`);
            navigate('/events'); // Redirect to the list of events after deletion
        } catch (error) {
            console.error('Failed to delete the event:', error);
            // Optionally handle errors more visibly for the user (e.g., through a Snackbar or Alert)
        }
    };

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
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={() => navigate(`/events/${id}/assign-ticket`)} style={{ marginBottom: '10px' }} fullWidth>
                    Assign Ticket
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => navigate('/events')} style={{ marginBottom: '10px' }} fullWidth>
                    Back to Event List
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => navigate(`/events/${id}/tickets`)} style={{ marginBottom: '10px' }} fullWidth>
                    View Tickets
                </Button>
            </Grid>
            <Grid item xs={12} >
                <Button
                    variant="contained"
                    color="error"
                    onClick={deleteEvent}
                    style={{ marginTop: '20px' }}
                    fullWidth
                >
                    Delete Event
                </Button>
            </Grid>
        </Paper>
        </Container>
    );
}

export default EventDetail;
