// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';  // Adjust based on actual API URL

export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const fetchEventById = (id) => axios.get(`${API_URL}/events/${id}`);
export const createEvent = (eventData) => axios.post(`${API_URL}/events`, eventData);
export const updateEvent = (id, eventData) => axios.put(`${API_URL}/events/${id}`, eventData);
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);

export const assignTicket = (ticketData) => axios.post(`${API_URL}/tickets`, ticketData);
export const fetchTickets = () => axios.get(`${API_URL}/tickets`);
export const verifyTicket = (qrCode) => axios.post(`${API_URL}/tickets/verify-qr`, { qrCode });
