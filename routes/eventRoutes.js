const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  registerForEvent
} = require("../controllers/eventController");
const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticate, getEvents);
router.post("/", authenticate, authorizeRole("organizer"), createEvent);
router.put("/:id", authenticate, authorizeRole("organizer"), updateEvent);
router.delete("/:id", authenticate, authorizeRole("organizer"), deleteEvent);
router.post("/:id/register", authenticate, registerForEvent);

module.exports = router;
