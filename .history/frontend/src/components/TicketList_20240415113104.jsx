// src/components/TicketList.jsx
import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';

function TicketList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets().then(response => {
            setTickets(response.data);
        }).catch(error => {
            console.error('Error fetching tickets:', error);
        });
    }, []);

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <h1>Tickets</h1>
            <List>
                {tickets.map(ticket => (
                    <ListItem key={ticket._id}>
                        <ListItemText primary={`${ticket.customer.name} - ${ticket.event.name}`} secondary={`Zone: ${ticket.zone}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default TicketList;
