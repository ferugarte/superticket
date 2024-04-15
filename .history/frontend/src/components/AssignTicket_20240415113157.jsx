// src/components/AssignTicket.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { assignTicket } from '../services/api';
import { TextField, Button, Paper, Typography, Grid } from '@material-ui/core';

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
        }).catch(error => {
            alert('Error assigning ticket:', error);
        });
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Typography variant="h4" component="h1">Assign Ticket</Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Event ID"
                            value={event}
                            onChange={e => setEvent(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Zone"
                            value={zone}
                            onChange={e => setZone(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Identity Number"
                            value={identityNumber}
                            onChange={e => setIdentityNumber(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="WhatsApp Number"
                            value={whatsappNumber}
                            onChange={e => setWhatsappNumber(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Assign Ticket
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default AssignTicket;
