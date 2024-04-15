import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';
import TicketList from './components/TicketList';
import AssignTicket from './components/AssignTicket';
import VerifyTicket from './components/VerifyTicket';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/assign-ticket" element={<AssignTicket />} />
        <Route path="/verify-ticket" element={<VerifyTicket />} />
        {/* Define other routes similarly */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
