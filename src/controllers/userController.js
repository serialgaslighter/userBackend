import { User } from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find());
  } catch (error) {
    next(error);
  }
}

export const getSingleUser = async (req, res, next) => {
  try {
    res.json(await User.findById(req.params.id));
  } catch (error) {
    next(error);
  }
}

export const addUser = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: 'Added user succesfully.'})
  } catch (error) {
    error.message = "Failed to create new user.";
    error.status = 500;
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedUser) {
      const error = new Error('User not found.');
      error.status = 404;
      next(error);
    }
    res.json({ message: "User updated." });
  } catch (error) {
    next(error);
  }
};

// soft-delete
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error('User not found.');
      error.status = 404;
      next(error);
    }
    user.deleted = true;
    await user.save();
    res.json({ message: "User soft deleted" })
  } catch (error) {
    next(error);
  }
}