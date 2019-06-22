const express = require("express");
const meetingsRouter = express.Router();
const { getAllFromDatabase, 
  createMeeting, 
  addToDatabase, 
  deleteAllFromDatabase
  } = require("./db");


meetingsRouter.get("/", (req, res) => {
  const meetings = getAllFromDatabase("meetings");
  res.status(200).send(meetings);
})

meetingsRouter.post("/", (req, res) => {
  const newMeeting = createMeeting();
  const addedMeeting = addToDatabase("meetings", newMeeting)
  res.status(201).send(addedMeeting);
});

meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

// meetingsRouter.delete("/:meetingId", (req, res) => {
//   const id = req.params.meetingId;
//   const meetings = getAllFromDatabase("meetings");
//   const meetIdx = meetings.findIndex(meet => meet.id === id);
//   console.log(meetIdx);
//   if (isNaN(id) || meetIdx === -1) {
//     res.status(404).send();
//   } else {
//     deleteFromDatabasebyId("meetings", id);
//     res.status(204).send();
//   }
// })

module.exports = meetingsRouter;