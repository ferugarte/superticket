// src/components/AssignTicket.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { assignTicket } from '../services/api';
import { TextField, Button, Paper } from '@material-ui/core';
import Paper from '@material-ui/core';

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
        }).catch(error => alert('Error assigning ticket:', error));
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <h1>Assign Ticket</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',
