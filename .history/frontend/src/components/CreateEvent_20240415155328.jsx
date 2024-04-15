import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Grid, IconButton, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [zones, setZones] = useState([
        { name: '', price: '', capacity: '' }
    ]);

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
        const eventData = {
            name: eventName,
            description,
            date,
            time,
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
                            onChange={e => setEventName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Time"
                            type="time"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {zones.map((zone, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={3}>
                                <TextField
                                    label="Zone Name"
                                    name="name"
                                    value={zone.name}
                                    onChange={e => handleChangeZone(index, e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={zone.price}
                                    onChange={e => handleChangeZone(index, e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Capacity"
                                    name="capacity"
                                    type="number"
                                    value={zone.capacity}
                                    onChange={e => handleChangeZone(index, e)}
                                    fullWidth
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    );
}

export default CreateEvent;
