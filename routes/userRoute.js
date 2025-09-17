import express from 'express';
import { registerUser, loginUser, getUsers } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getUser", authMiddleware, getUsers);

export default router;