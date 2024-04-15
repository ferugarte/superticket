// src/RouterComponent.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';
import TicketList from './components/TicketList';
import AssignTicket from './components/AssignTicket';
import VerifyTicket from './components/VerifyTicket';

function RouterComponent() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/events/:eventId/tickets" element={<TicketList />} />
        <Route path="/events/:id/assign-ticket" element={<AssignTicket />} />
        <Route path="/verify-ticket" element={<VerifyTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
