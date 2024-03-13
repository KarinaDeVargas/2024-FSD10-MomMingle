import express from "express";
import { getAttendees, addAttendee } from "../controllers/event.js";

const router = express.Router();

router.get("/:id/attendees", getAttendees);
router.post("/:id/attendees", addAttendee);

export default router;
