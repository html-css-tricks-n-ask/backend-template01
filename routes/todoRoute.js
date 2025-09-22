import express from "express";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../controller/todoController.js";
import  authMiddleware  from "../middleware/authMiddleware.js"; // for JWT auth

const router = express.Router();

router.route("/todo/:id")
.get(authMiddleware, getTodos);


router.route("/todo").post(authMiddleware, addTodo);
  

router.route("/:id")
  .patch(authMiddleware, toggleTodo)
  .delete(authMiddleware, deleteTodo);

export default router;
