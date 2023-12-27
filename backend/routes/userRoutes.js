import express from 'express';
const router = express.Router();

import { authUser, deleteUser, getUserById,getUserProfile,getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController';

router.route('/').post(registerUser).get(getUsers);
router.route('/logout', logoutUser);
router.route('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser)

export default router; 