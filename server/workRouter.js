const express = require("express");
const workRouter = express.Router({mergeParams: true});
const {
  getAllFromDatabase,
  getFromDatabaseById, 
  addToDatabase, 
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require("./db");

workRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (isNaN(id) || typeof work === "undefined") {
    res.status(404).send("Work not found");
  } else if (req.params.minionId !== work.minionId) {
    res.status(400).send("Wrong minion");
  } else {
    next();
  }
});

workRouter.get("/", (req, res) => {
  const allWork = getAllFromDatabase("work");
  const minionWork = allWork.filter(work => work.minionId === req.params.minionId)
  res.status(200).send(minionWork);
});

workRouter.post("/", (req, res) => {
  const newWork = addToDatabase("work", req.body);
  res.status(201).send(newWork);
});

workRouter.put("/:workId", (req, res) => {
  const updatedWork = updateInstanceInDatabase("work", req.body);
  res.status(200).send(updatedWork);
});

workRouter.delete("/:workId", (req, res) => {
  deleteFromDatabasebyId("work", req.params.workId);
  res.status(204).send();
});

module.exports = workRouter;
