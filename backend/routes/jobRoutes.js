const express = require("express");
const router = express.Router();

const Job = require("../models/Job");


// ====================================
// CREATE JOB
// ====================================
router.post("/create", async (req, res) => {

  try {

    const {

      builderId,

      workersRequired,

      requiredSkill,

      location,

      date,

      wage

    } = req.body;

    const job = new Job({

      builderId,

      workersRequired,

      requiredSkill,

      location,

      date,

      wage

    });

    await job.save();

    res.status(201).json({

      message: "Job created successfully",

      job

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

// ====================================
// GET ALL JOBS
// ====================================
router.get("/", async (req, res) => {

  try {

    const jobs = await Job.find()
      .populate("builderId", "name phone")
      .populate("applicants", "name phone")
      .populate("selectedWorker", "name phone");

    res.status(200).json(jobs);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// GET BUILDER JOBS
// ====================================
router.get("/builder/:builderId", async (req, res) => {

  try {

    const jobs = await Job.find({
      builderId: req.params.builderId
    })
      .populate("applicants", "name phone")
      .populate("selectedWorker", "name phone");

    res.status(200).json(jobs);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// APPLY JOB
// ====================================
router.put("/apply/:jobId", async (req, res) => {

  try {

    const { workerId } = req.body;

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    if (job.applicants.includes(workerId)) {

      return res.status(400).json({
        message: "Already applied"
      });

    }

    job.applicants.push(workerId);

    await job.save();

    res.status(200).json({
      message: "Applied successfully"
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// ACCEPT WORKER
// ====================================
router.put("/accept/:jobId", async (req, res) => {

  try {

    const { workerId } = req.body;

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    job.selectedWorker = workerId;
    job.status = "assigned";

    await job.save();

    res.status(200).json({
      message: "Worker selected successfully",
      job
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// COMPLETE JOB
// ====================================
router.put("/complete/:jobId", async (req, res) => {

  try {

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    job.status = "completed";

    await job.save();

    res.status(200).json({
      message: "Job completed successfully",
      job
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// ====================================
// EDIT JOB
// ====================================
router.put("/edit/:jobId", async (req, res) => {

  try {

    const {
      location,
      workersRequired,
      wage,
      date
    } = req.body;

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    job.location = location;
    job.workersRequired = workersRequired;
    job.wage = wage;
    job.date = date;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// RATE WORKER FOR A JOB
// ====================================
router.put("/rate/:jobId", async (req, res) => {

  try {

    const { rating } = req.body;

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    job.workerRating = rating;

    await job.save();

    res.status(200).json({
      message: "Rating saved successfully",
      job
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ====================================
// DELETE JOB
// ====================================
router.delete("/delete/:jobId", async (req, res) => {

  try {

    const job = await Job.findById(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    await Job.findByIdAndDelete(req.params.jobId);

    res.status(200).json({
      message: "Job deleted successfully"
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;