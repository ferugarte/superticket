import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function TicketListByEvent() {
    const { eventId } = useParams();  // This hooks extracts params from URL
    const navigate = useNavigate();  // This hook is for navigation
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tickets when component mounts or eventId changes
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/events/${eventId}/tickets`);
                setTickets(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tickets:', err);
                setError('Failed to load tickets');
                setLoading(false);
            }
        };

        fetchTickets();
    }, [eventId]);

    const handleBackToEventDetails = () => {
        navigate(`/events/${eventId}`);
    };

    if (loading) return <Typography>Loading tickets...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Tickets for the Event
            </Typography>
            <List>
                {tickets.map(ticket => (
                    <ListItem key={ticket._id} divider>
                        <ListItemText
                            primary={`Ticket ID: ${ticket._id}`}
                            secondary={`Customer Name: ${ticket.customer.name}, Zone: ${ticket.zone}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToEventDetails}
                style={{ marginTop: '20px' }}
            >
                Back to Event Details
            </Button>
        </Paper>
    );
}

export default TicketListByEvent;
