import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Grid, IconButton, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function CreateEvent() {
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [mapUrl, setMapUrl] = useState(''); // State to hold the Google Maps URL
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [zones, setZones] = useState([{ name: '', price: '', capacity: '' }]);

    const handleAddZone = () => {
        setZones([...zones, { name: '', price: '', capacity: '' }]);
    };

    const handleRemoveZone = (index) => {
        const list = [...zones];
        list.splice(index, 1);
        setZones(list);
    };

    const handleChangeZone = (index, event) => {
        const { name, value } = event.target;
        const list = [...zones];
        list[index][name] = value;
        setZones(list);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Extract latitude and longitude from Google Maps URL
        const coords = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (coords) {
            setLocation({ lat: coords[1], lng: coords[2] });
        }

        const eventData = {
            name: eventName,
            description,
            date,
            time,
            location,
            zones
        };
        
        axios.post('http://localhost:3000/api/events', eventData)
            .then(() => alert('Event created successfully!'))
            .catch(error => alert('Error creating event:', error));
    };

    return (
        <Container maxWidth="sm">
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: 20 }}>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Google Maps URL"
                            value={mapUrl}
                            onChange={(e) => setMapUrl(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    {zones.map((zone, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={3}>
                                <TextField
                                    label="Zone Name"
                                    name="name"
                                    value={zone.name}
                                    onChange={(e) => handleChangeZone(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={zone.price}
                                    onChange={(e) => handleChangeZone(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Capacity"
                                    name="capacity"
                                    type="number"
                                    value={zone.capacity}
                                    onChange={(e) => handleChangeZone(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton onClick={() => handleRemoveZone(index)} color="error">
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                {index === zones.length - 1 && (
                                    <IconButton onClick={handleAddZone} color="primary">
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="success" fullWidth>
                            Create Event
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => navigate('/events')} style={{ marginBottom: '10px' }} fullWidth>
                            Back to Event List
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    );
}

export default CreateEvent;
