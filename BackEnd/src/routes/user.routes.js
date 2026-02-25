const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

// Profil utilisateur connecté
router.get('/profile', auth, userController.getProfile);

// ADMIN : récupérer tous les utilisateurs
router.get('/', auth, admin, userController.getAllUsers);

// ADMIN : supprimer un utilisateur
router.delete('/:id', auth, admin, userController.deleteUser);
// ADMIN : créer un utilisateur ou un admin
router.post('/create', auth, admin, userController.createUserByAdmin);
router.put('/:id', auth, admin, userController.updateUser);


module.exports = router;
