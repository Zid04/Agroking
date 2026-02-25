const User = require('../models/user.model');
const bcrypt = require('bcrypt');

/* ============================
   ADMIN : RÉCUPÉRER TOUS LES USERS
   ============================ */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   ADMIN : SUPPRIMER UN USER
   ============================ */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    await User.findByIdAndDelete(id);

    res.json({ message: "Utilisateur supprimé" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   ADMIN : CRÉER UN USER OU ADMIN
   ============================ */
exports.createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, tel, role } = req.body;

    // Vérifier rôle
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    // Vérifier email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Vérification mot de passe fort
    const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Mot de passe trop faible. Il doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
      });
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      tel,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        tel: newUser.tel,
        role: newUser.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   ADMIN : METTRE À JOUR UN USER
   ============================ */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, tel, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, tel, role },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({
      message: "Utilisateur mis à jour",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
