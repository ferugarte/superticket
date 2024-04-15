import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, List, ListItem, ListItemText, Paper, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';  // Import MUI delete icon for the button

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

    const deleteTicket = async (ticketId) => {
        try {
            console.log(`Deleting the ticket with id ${ticketId}`);
            await axios.delete(`http://localhost:3000/api/tickets/${ticketId});
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));  // Update state to remove deleted ticket
        } catch (error) {
            console.error('Failed to delete ticket:', error);
        }
    };

    if (loading) return <Typography>Loading tickets...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm">
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
                        <IconButton onClick={() => deleteTicket(ticket._id)} edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
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
        </Container>
    );
}

export default TicketListByEvent;
