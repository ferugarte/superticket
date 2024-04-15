// src/components/VerifyTicket.jsx
import React, { useState } from 'react';
import { verifyTicket } from '../services/api';
import { TextField, Button, Paper, Typography } from '@material-ui/core';

function VerifyTicket() {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyTicket({ qrCode }).then(response => {
            setMessage(`Verification result: ${response.data.message}`);
        }).catch(error => {
            setMessage(`Error verifying ticket: ${error.message}`);
        });
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Typography variant="h4" component="h1">Verify Ticket</Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <TextField
                    label="QR Code"
                    value={qrCode}
                    onChange={e => setQrCode(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Verify
                </Button>
                {message && <Typography style={{ marginTop: 20 }}>{message}</Typography>}
            </form>
        </Paper>
    );
}

export default VerifyTicket;
