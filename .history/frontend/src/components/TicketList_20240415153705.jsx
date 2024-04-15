import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Paper, Typography, CircularProgress } from '@mui/material';

function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        setIsLoading(true);
        axios.get('http://localhost:3000/api/tickets') // Make sure the URL matches your server's configuration
            .then(response => {
                setTickets(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tickets:', error);
                setError('Failed to fetch tickets');
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    return (
        <Container maxWidth="sm">
        <Paper style={{ margin: '16px', padding: '16px' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Tickets List
            </Typography>
            <List>
                {tickets.length > 0 ? tickets.map(ticket => (
                    <ListItem key={ticket._id} divider>
                        <ListItemText
                            primary={`Ticket for: ${ticket.event.name}`}
                            secondary={`Assigned to: ${ticket.customer.name} - Zone: ${ticket.zone}`}
                        />
                    </ListItem>
                )) : (
                    <ListItem>
                        <ListItemText primary="No tickets available" />
                    </ListItem>
                )}
            </List>
        </Paper>
        </Container>
    );
}

export default TicketList;
