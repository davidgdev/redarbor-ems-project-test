import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  deleteMultiple,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/posts.controllers.js";

const router = Router();

router.get("/employees", getEmployees);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.delete("/employees/delete/:ids", deleteMultiple);
router.get("/employees/:id", getEmployee);

export default router;
