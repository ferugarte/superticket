// src/components/AssignTicket.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { assignTicket } from '../services/api';
import { TextField, Button, Paper } from '@material-ui/core';

function AssignTicket() {
    const [event, setEvent] = useState('');
    const [zone, setZone] = useState('');
    const [name, setName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = { event, zone, customer: { name, identityNumber, whatsappNumber } };
        assignTicket(ticketData).then(() => {
            alert('Ticket assigned successfully');
            history.push('/tickets');
        }).catch(error => alert('Error assigning ticket:', error));
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <h1>Assign Ticket</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                    label="Event ID"
                    value={event}
                    onChange={e => setEvent(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Zone"
                    value={zone}
                    onChange={e => setZone(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Identity Number"
                    value={identityNumber}
                    onChange={e => setIdentityNumber(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="WhatsApp Number"
                    value={whatsappNumber}
                    onChange={e => setWhatsappNumber(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Assign Ticket
                </Button>
            </form>
        </Paper>
    );
}

export default AssignTicket;
