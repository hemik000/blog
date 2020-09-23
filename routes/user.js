const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/users", getAllUsers)

module.exports = router;
