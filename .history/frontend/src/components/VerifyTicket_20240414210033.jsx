// src/components/VerifyTicket.jsx
import React, { useState } from 'react';
import { verifyTicket } from '../services/api';

function VerifyTicket() {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyTicket(qrCode).then(response => {
            setMessage(response.data.message);
        }).catch(error => {
            setMessage('Error verifying ticket: ' + error.message);
        });
    };

    return (
        <div>
            <h1>Verify Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>QR Code:</label>
                    <input type="text" value={qrCode} onChange={e => setQrCode(e.target.value)} />
                </div>
                <button type="submit">Verify</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default VerifyTicket;
