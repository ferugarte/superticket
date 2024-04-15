// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/api';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents().then(response => setEvents(response.data))
                     .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <Link to={`/events/${event._id}`}>{event.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-event" className="btn btn-primary">Add Event</Link>
        </div>
    );
}

export default EventList;
