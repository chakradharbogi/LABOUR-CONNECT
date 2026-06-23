const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    builderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    masonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    selectedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // ⭐ NEW FIELD
    workerRating: {
      type: Number,
      default: 0
    },

    workersRequired: Number,
      
    requiredSkill: {
      type: String,
      default: ""
    },

    location: String,

    date: String,

    wage: Number,

    status: {
      type: String,
      default: "pending"
    }

  },
  {
    timestamps: true
  });

module.exports = mongoose.model("Job", jobSchema);