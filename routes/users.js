const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthenticatedBrowser } = require('../middleware/authenticate');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController');

router.get('/', isAuthenticatedBrowser, getAllUsers);
router.get('/:id', isAuthenticatedBrowser, getUserById);
router.post('/', isAuthenticated, createUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

module.exports = router;