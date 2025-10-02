// backend/src/routes/machineRoutes.js
const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");

router.post("/", async (req, res) => {
  const machine = await Machine.create(req.body);
  res.json(machine);
});

router.get("/", async (req, res) => {
  const machines = await Machine.find();
  res.json(machines);
});

router.put("/:id", async (req, res) => {
  const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(machine);
});

router.delete("/:id", async (req, res) => {
  await Machine.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuário deletado" });
});

module.exports = router;
