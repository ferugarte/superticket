import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

function AssignTicket() {
    const [events, setEvents] = useState([]);
    const [eventID, setEventID] = useState('');
    const [zone, setZone] = useState('');
    const [name, setName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        // Fetch events when component mounts
        axios.get('http://localhost:3000/api/events')
            .then(response => {
                setEvents(response.data);
                if (response.data.length > 0) {
                    setEventID(response.data[0]._id); // Set default event ID if events are available
                }
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            event: eventID,
            zone,
            customer: {
                name,
                identityNumber,
                whatsappNumber
            }
        };
        axios.post('http://localhost:3000/api/tickets', ticketData)
            .then(response => {
                setMessage('Ticket assigned successfully!');
                setSeverity('success');
                setOpen(true);
            })
            .catch(error => {
                setMessage('Error assigning ticket: ' + error.message);
                setSeverity('error');
                setOpen(true);
            });
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth="sm">
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: 20 }}>
                Assign Ticket
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="event-label">Event</InputLabel>
                            <Select
                                labelId="event-label"
                                value={eventID}
                                label="Event"
                                onChange={e => setEventID(e.target.value)}
                            >
                                {events.map(event => (
                                    <MenuItem key={event._id} value={event._id}>
                                        {event.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            Assign
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose()}>
                <Alert onClose={() => handleClose()} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Paper>
        </Container>
    );
}

export default AssignTicket;
