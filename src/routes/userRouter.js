import express from 'express';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(addUser)

userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser)