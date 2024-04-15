// src/components/TicketVerification.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

function TicketVerification() {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    const verifyTicket = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/tickets/verify', { qrCode })
            .then(response => setMessage(response.data.message))
            .catch(error => setMessage('Verification failed: ' + error.message));
    };

    return (
        <form onSubmit={verifyTicket}>
            <TextField
                label="QR Code"
                value={qrCode}
                onChange={e => setQrCode(e.target.value)}
                fullWidth
            />
            <Button type="submit" color="primary" variant="contained">Verify Ticket</Button>
            <div>{message}</div>
        </form>
    );
}

export default TicketVerification;
