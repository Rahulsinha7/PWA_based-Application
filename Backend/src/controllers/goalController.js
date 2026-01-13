import Goal from "../models/Goal.js";


export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getGoals = async (req, res) => {
  const goals = await Goal.find().sort({ createdAt: -1 });
  res.json(goals);
};


export const updateGoal = async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(goal);
};


export const deleteGoal = async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ message: "Goal removed" });
};
