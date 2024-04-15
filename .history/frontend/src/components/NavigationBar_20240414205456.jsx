// src/components/NavigationBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">Event Management</Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-event">Create Event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tickets">Tickets</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/assign-ticket">Assign Ticket</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/verify-ticket">Verify Ticket</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavigationBar;
