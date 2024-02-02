import express from "express";
const router = express.Router();

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { allUsers,getUser, deleteUser, editUser, singleUser, filterEmployeesByLocation, sortEmployeesByName, } from "../controllers/userController.js";


//user routes

router.get('/allusers',isAuthenticated, allUsers);
router.get('/user', getUser);
router.get('/user/:id',isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/user/delete/:id', isAuthenticated, deleteUser);

router.get('/allusers/filterByLocation', filterEmployeesByLocation);
router.get('/allusers/sortByName', isAuthenticated, sortEmployeesByName);

export default router;
