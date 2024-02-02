import express from "express";
const router = express.Router();
import {logout, signIn, signUp, userProfile} from '../controllers/authController.js'
import { isAuthenticated } from "../middleware/auth.js";

//  auth routes
router.post('/signup', signUp
);

router.post('/signin', signIn
);

router.get('/logout', logout);

router.get('/me', isAuthenticated, userProfile);

export default router;
