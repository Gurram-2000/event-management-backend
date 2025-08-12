const { events } = require("../models/EventModel");

exports.createEvent = (req, res) => {
  const { title, date, time, description } = req.body;
  const newEvent = {
    id: Date.now(),
    title,
    date,
    time,
    description,
    organizerId: req.user.id,
    participants: []
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};

exports.updateEvent = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event || event.organizerId !== req.user.id)
    return res.status(403).json({ message: "Unauthorized or event not found" });

  Object.assign(event, req.body);
  res.json(event);
};

exports.deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1 || events[index].organizerId !== req.user.id)
    return res.status(403).json({ message: "Unauthorized or event not found" });

  events.splice(index, 1);
  res.json({ message: "Event deleted" });
};

exports.getEvents = (req, res) => {
  res.json(events);
};

exports.registerForEvent = async (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.participants.includes(req.user.id)) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.participants.push(req.user.id);
  res.json({ message: "Registered for event" });
};
