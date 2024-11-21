import express from 'express';
import { getUsers, getSingleUser, addUser, updateUser, deleteUser } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(addUser)

userRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser)