import asyncHandler from "../middleware/asyncHandler.js";


//@desc auth user
//@route POST /api/user/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
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
  res.send("logout user");
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
