import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// @desc Authenticate user and get token
// @route POST/api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20d", //expires in 20 days
    });

    //set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 20 * 24 * 60 * 1000, // 20 days n
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc  Register user
//@route POST /api/user
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

//@desc  Logout user , clear cookie
//@route POST /api/user/loginout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

//@desc  Get user profile
//@route GET /api/user/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc  Update user profile
//@route PUT /api/user/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@desc  Get users
//@route GET /api/user/users
//@access Private -admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc  Get user by ID
//@route GET /api/user/user/:id
//@access Private -admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@desc  Delete users
//@route DELETE /api/user/users:id
//@access Private -admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc  Delete users
//@route PUT /api/user/users:id
//@access Private -admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
};
