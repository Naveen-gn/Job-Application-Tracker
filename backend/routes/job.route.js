import express from "express";
import {
  getAllJobs,
  getJobsForTable,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Route to get all jobs with filtering and sorting
router.get("/", getAllJobs);

// Route to get all jobs for table display
router.get("/table", getJobsForTable);

// Route to create a new job
router.post("/", createJob);

// Route to get a specific job by ID
router.get("/:id", getJobById);

// Route to update a specific job by ID
router.put("/:id", updateJob);

// Route to delete a specific job by ID
router.delete("/:id", deleteJob);

export default router;
