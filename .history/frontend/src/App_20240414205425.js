// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';
import TicketList from './components/TicketList';
import AssignTicket from './components/AssignTicket';
import VerifyTicket from './components/VerifyTicket';
import NavigationBar from './components/NavigationBar';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-3">
        <Switch>
          <Route path="/" exact component={EventList} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/tickets" component={TicketList} />
          <Route path="/assign-ticket" component={AssignTicket} />
          <Route path="/verify-ticket" component={VerifyTicket} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
