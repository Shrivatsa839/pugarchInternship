// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy data (in-memory store)
let events = [
  {
    id: 1,
    title: "Tech Conference",
    description: "Learn latest tech trends",
    date: "2025-08-25",
    category: "Technology",
    banner: "https://via.placeholder.com/300",
    registered: false,
  },
];

// GET all events
app.get("/events", (req, res) => {
  res.json(events);
});

// GET single event
app.get("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

// CREATE event
app.post("/events", (req, res) => {
  const newEvent = {
    id: events.length + 1,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
    banner: req.body.banner || "https://via.placeholder.com/300",
    registered: false,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// UPDATE event
app.put("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  event.title = req.body.title || event.title;
  event.description = req.body.description || event.description;
  event.date = req.body.date || event.date;
  event.category = req.body.category || event.category;
  event.banner = req.body.banner || event.banner;

  res.json(event);
});

// DELETE event
app.delete("/events/:id", (req, res) => {
  events = events.filter((e) => e.id !== parseInt(req.params.id));
  res.json({ message: "Event deleted" });
});

// REGISTER for event
app.post("/events/:id/register", (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  event.registered = true;
  res.json({ message: "Registered successfully", event });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
