import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Grid, MenuItem, FormControl, InputLabel, Select, Container } from '@mui/material';

function AssignTicket() {
    const { id } = useParams();  // Assuming you are passing the event ID in the route
    const navigate = useNavigate();
    const [eventZones, setEventZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');

    // Fetch event details including zones
    useEffect(() => {
        axios.get(`https://superticket-backend.uc.r.appspot.com/api/events/${id}`)
            .then(response => {
                setEventZones(response.data.zones);
                if (response.data.zones.length > 0) {
                    setSelectedZone(response.data.zones[0].name);  // Default to the first zone
                }
            })
            .catch(error => {
                console.error('Error fetching event details:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            event: id,  // or event name depending on your backend model
            zone: selectedZone,
            customer: {
                name: customerName,
                identityNumber,
                whatsappNumber
            },
            qrCode: "-",
            isUsed: false
        };
        axios.post('https://superticket-backend.uc.r.appspot.com/api/tickets', ticketData)
            .then(() => {
                alert('¡Ticket asignado exitosamente!');
                navigate('/');  // Redirect or handle post-submission logic
            })
            .catch(error => {
                alert('Error al asignar el ticket:', error);
            });
    };

    return (
        <Container maxWidth="sm">
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: 20 }}>
                Asignar Ticket
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="zone-label">Zona</InputLabel>
                            <Select
                                labelId="zone-label"
                                id="zone-select"
                                value={selectedZone}
                                label="Zone"
                                onChange={e => setSelectedZone(e.target.value)}
                            >
                                {eventZones.map(zone => (
                                    <MenuItem key={zone.name} value={zone.name}>
                                        {zone.name} - ${zone.price}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre y Apellido"
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Cédula de Identidad"
                            value={identityNumber}
                            onChange={e => setIdentityNumber(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Número de WhatsApp"
                            value={whatsappNumber}
                            onChange={e => setWhatsappNumber(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="success" fullWidth>
                            Asignar Ticket
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => navigate(`/events/${id}`)} fullWidth>
                            Volver al Detalle del Evento
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    );
}

export default AssignTicket;
