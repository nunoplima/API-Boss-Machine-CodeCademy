const express = require("express");
const ideasRouter = express.Router();

const { 
  getAllFromDatabase, 
  getFromDatabaseById, 
  updateInstanceInDatabase,
  addToDatabase, 
  deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");


ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (isNaN(id) || typeof idea === "undefined") {
    const err = new Error("Idea not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
})

ideasRouter.get("/", (req, res) => {
  const ideas = getAllFromDatabase("ideas");
  res.status(200).send(ideas);     
});

ideasRouter.get("/:ideaId", (req, res) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaId);
  res.status(200).send(idea);
});

ideasRouter.put("/:ideaId", (req, res) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.status(200).send(updatedIdea);
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.delete("/:ideaId", (req, res) => {
  deleteFromDatabasebyId("ideas", req.params.ideaId);
  res.status(204).send();
});

ideasRouter.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  } 
  else {
    res.status(err.status).send(err.message);
  }
});

module.exports = ideasRouter;