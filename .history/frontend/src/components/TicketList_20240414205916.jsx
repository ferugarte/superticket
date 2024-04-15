// src/components/TicketList.jsx
import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api';

function TicketList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets().then(response => setTickets(response.data))
                      .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    return (
        <div>
            <h1>Tickets</h1>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket._id}>
                        {ticket.customer.name} - {ticket.event.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TicketList
