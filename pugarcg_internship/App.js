import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
} from "@mui/material";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    banner: "",
  });

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Register for event
  const handleRegister = async (id) => {
    await fetch(`http://localhost:5000/events/${id}/register`, {
      method: "POST",
    });
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: true } : e))
    );
  };

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newEvent = await res.json();
    setEvents((prev) => [...prev, newEvent]);
    setForm({ title: "", description: "", date: "", category: "", banner: "" });
  };

  return (
    <>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">📅 EventHub</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        {/* Add Event Form */}
        <form
          onSubmit={handleAddEvent}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create New Event
          </Typography>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
          <input
            placeholder="Banner URL"
            value={form.banner}
            onChange={(e) => setForm({ ...form, banner: e.target.value })}
            style={{ margin: "5px", padding: "8px" }}
          />
          <Button type="submit" variant="contained" sx={{ marginLeft: 2 }}>
            Add Event
          </Button>
        </form>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={event.banner}
                  alt={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    <b>Date:</b> {event.date} | <b>Category:</b> {event.category}
                  </Typography>
                  <Button
                    variant="contained"
                    color={event.registered ? "secondary" : "primary"}
                    disabled={event.registered}
                    onClick={() => handleRegister(event.id)}
                    sx={{ marginTop: 2 }}
                  >
                    {event.registered ? "Registered ✅" : "Register"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
