import fs from "fs";

const userDataFile = "user_data.txt";

const readUserData = () => {
  try {
    const data = fs.readFileSync(userDataFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUserData = (userData) => {
  const dataToWrite = JSON.stringify(userData);
  fs.writeFileSync(userDataFile, dataToWrite, "utf-8");
};

let userData = readUserData();

export const getUsers = (req, res, next) => {
  try {
    res.json({
      message: "Liste aller Benutzer abgerufen",
      users: userData,
    });
  } catch (error) {
    error.message = "Data not found.";
    error.status = 404;
    next(error)
  }
}

export const addUser = (req, res) => {
  try {
    const newUser = req.body;
    userData.push(newUser);
  
    writeUserData(userData)
  
    res.json({
      message: "Neuer Benutzer erstellt",
      user: newUser,
    });
  } catch (error) {
    error.message = "Invalid user data provided.";
    error.status = 400;
    next(error)
  }
}

export const updateUser = (req, res, next) => {
  try {
    const userID = parseInt(req.params.userID);
    const index = userData.findIndex(user => user.id === userID);

    if (index !== -1) {
      userData[index] = { ...userData[index], ...req.body };
      writeUserData(userData);
      res.json({
        message: "User has been updated.",
        user: userData[index]
      });
    } else {
      res.status(404).json({
        message: "User was not found."
      });
    }
  } catch (error) {
    error.message = "User could not be updated.";
    error.status = 400;
    next(error);
  }
};

export const deleteUser = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const index = userData.findIndex(user => user.id === userID);
  
    if (index !== -1) {
      const deletedUser = userData.splice(index, 1);
      writeUserData(userData);
      res.json({
        message: "User has been deleted.",
        userData: deletedUser
      })
    } else {
      res.status(404).json({message: "User not found."})
    }
  } catch (error) {
    error.message = "User could not be deleted.";
    error.status = 400;
    next(error);
  }
}