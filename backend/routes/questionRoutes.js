const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// ➤ GET STATS (New: for the top buttons)
router.get("/stats", async (req, res) => {
  try {
    const pending = await Question.countDocuments({ status: "pending" });
    const approved = await Question.countDocuments({ status: "approved" });
    const rejected = await Question.countDocuments({ status: "rejected" });
    
    res.json({ pending, approved, rejected });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Submit Question
router.post("/ask", async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) return res.status(400).json({ message: "Required fields missing" });
    const question = new Question({ name, text, status: "pending" });
    await question.save();
    res.status(201).json(question);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ➤ Get Pending
router.get("/pending", async (req, res) => {
  try {
    const questions = await Question.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ➤ Get Approved
router.get("/approved", async (req, res) => {
  try {
    const questions = await Question.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ➤ Get Rejected (New: so the third button works)
router.get("/rejected", async (req, res) => {
  try {
    const questions = await Question.find({ status: "rejected" }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ➤ Approve
router.put("/approve/:id", async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Question approved" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ➤ Reject
router.put("/reject/:id", async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Question rejected" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
// routes/questionRoutes.js

// Make sure this specific route exists!
router.get("/list/:status", async (req, res) => {
  try {
    const { status } = req.params; // This will be 'pending', 'approved', or 'rejected'
    const questions = await Question.find({ status }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// This route handles both 'approved' and 'rejected' based on the body sent from frontend
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body; // Frontend sends { status: "approved" }
    
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ UPDATE STATUS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;