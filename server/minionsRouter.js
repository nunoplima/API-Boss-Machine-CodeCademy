const express = require("express");
const minionsRouter = express.Router();
const { getAllFromDatabase, 
  getFromDatabaseById, 
  updateInstanceInDatabase, 
  addToDatabase,
  deleteFromDatabasebyId
} = require("./db"); // se só queres importar uma fn de um file que exporta várias usa { fn }

const workRouter = require("./workRouter");

minionsRouter.use("/:minionId/work", workRouter);

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (isNaN(id) || typeof minion === "undefined") {
    err = new Error("Minion not found");
    err.status = 404;
    next(err);  
  } else {
    next();
  }
});

// const checkId = (req, res, next) => {
//   const id = req.params.minionId;
//   const allMinions = getAllFromDatabase("minions");
//   const minionIndex = allMinions.findIndex(minion => minion.id === id);
//   if (isNaN(id) || minionIndex === -1) {
//     err = new Error("Minion not found");
//     err.status = 404;
//     next(err);  
//   } else {
//     req.minionIndex = minionIndex;
//     next();
//   }
// }; ---> teria que fazer minionsRouter.use() ou colocar como call-back das routes

minionsRouter.get("/", (req, res) => {
  const allMinions = getAllFromDatabase("minions");
  res.status(200).send(allMinions);
})

minionsRouter.get("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  res.status(200).send(minion);
})

minionsRouter.put("/:minionId", (req, res) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.status(200).send(updatedMinion);
});

minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.delete("/:minionId", (req, res) => {
  deleteFromDatabasebyId("minions", req.params.minionId);
  res.status(204).send();
});

minionsRouter.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  } else {
    res.status(err.status).send(err.message);
  }
});


module.exports = minionsRouter;