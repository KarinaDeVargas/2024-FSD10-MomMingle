import express from "express";
import {
  getAttendees,
  addAttendee,
  getComments,
  addComment,
} from "../controllers/event.js";

const router = express.Router();

router.get("/:id/attendees", getAttendees);
router.post("/:id/attendees", addAttendee);
router.get("/:id/comments", getComments);
router.post("/:id/comments", addComment);

export default router;
