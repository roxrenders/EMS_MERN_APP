import express from "express";
const router = express.Router();

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { addEmployee, deleteEmployee,allDepts, createDept, deleteDept, editDept, singleDept } from "../controllers/deptController.js";


//dept routes
router.post('/createdept',isAuthenticated,createDept);
router.post('/addemployee',addEmployee);
router.delete('/deleteemployee',deleteEmployee);
router.get('/alldepts',isAuthenticated,allDepts);
router.get('/dept/:id', isAuthenticated,singleDept);
router.put('/dept/edit/:id', isAuthenticated,editDept);
router.delete('/dept/delete/:id', isAuthenticated, isAdmin, deleteDept);

export default router;
