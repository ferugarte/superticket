const Event = require('../models/Event');

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
    try {
        console.log(req.body);
        const event = new Event(req.body);
        await event.save();
        res.status(201).send({ message: "Event created successfully", data: event });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un evento por ID
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un evento
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.status(200).send({ message: "Event updated successfully", data: event });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.status(200).send({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
