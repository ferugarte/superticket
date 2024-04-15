// src/RouterComponent.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

function RouterComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/assign-ticket" element={<AssignTicket />} />
        <Route path="/verify-ticket" element={<VerifyTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
