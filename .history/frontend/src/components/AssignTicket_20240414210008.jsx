// src/components/AssignTicket.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { assignTicket } from '../services/api';

function AssignTicket() {
    const [event, setEvent] = useState('');
    const [zone, setZone] = useState('');
    const [name, setName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            event, zone, customer: { name, identityNumber, whatsappNumber }
        };
        assignTicket(ticketData).then(() => {
            alert('Ticket assigned successfully');
            history.push('/tickets');
        }).catch(error => alert('Error assigning ticket:', error));
    };

    return (
        <div>
            <h1>Assign Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event ID:</label>
                    <input type="text" value={event} onChange={e => setEvent(e.target.value)} />
                </div>
                <div
