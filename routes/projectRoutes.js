import express from "express";
import {
  getAllProjectsData,
  createProjects,
  deleteProject,
  editProject,
  getProjectData,
} from "../controllers/projectController.js";
import auth from "../middleware/auth.js";
import multerUpload from "../middleware/multerUploadSingle.js";
const router = express.Router();

router
  .route("/")
  .get(getAllProjectsData)
  .post(auth, multerUpload, createProjects);

router
  .route("/:id")
  .get(auth, getProjectData)
  .delete(auth, deleteProject)
  .patch(auth, multerUpload, editProject);

export default router;
