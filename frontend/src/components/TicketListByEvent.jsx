import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, List, ListItem, ListItemText, Paper, IconButton, Snackbar, Alert, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TicketListByEvent() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // State to manage Snackbar visibility

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/events/${eventId}/tickets`);
            setTickets(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching tickets:', error);
            setLoading(false);
        }
    };

    const deleteTicket = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`);
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            setOpenSnackbar(true);  // Open the Snackbar upon successful deletion
        } catch (error) {
            console.error('Failed to delete ticket:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);  // Close the Snackbar
    };

    if (loading) return <Typography>Loading tickets...</Typography>;

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
                onClick={() => navigate(`/events/${eventId}`)}
                style={{ marginTop: '20px' }}
                fullWidth
            >
                Back to Event Details
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Ticket successfully deleted.
                </Alert>
            </Snackbar>
        </Paper>
        </Container>
    );
}

export default TicketListByEvent;
