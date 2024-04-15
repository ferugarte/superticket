import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Grid, IconButton } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState({ lat: 34.0522, lng: -118.2437 }); // Default coordinates (Los Angeles)
    const [zones, setZones] = useState([{ name: '', price: '', capacity: '' }]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_API_KEY" // Replace with your Google Maps API key
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 34.0522,
        lng: -118.2437 // Center the map at initial load
    };

    const onMapClick = React.useCallback((event) => {
        setLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    }, []);

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
            location,
            zones
        };
        axios.post('http://localhost:3000/api/events', eventData)
            .then(() => alert('Event created successfully!'))
            .catch(error => alert('Error creating event:', error));
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: 20 }}>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Other form fields here */}
                    <Grid item xs={12}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={8}
                            center={center}
                            onClick={onMapClick}
                        >
                            <Marker position={{ lat: location.lat, lng: location.lng }} />
                        </GoogleMap>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default CreateEvent;
