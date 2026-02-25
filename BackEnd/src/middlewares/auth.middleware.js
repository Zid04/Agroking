const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Aucun token envoyé
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Vous devez être connecté pour effectuer cette action.",
        code: "NO_TOKEN"
      });
    }

    const token = authHeader.split(" ")[1];

    // Vérification du token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        status: "error",
        message: "Votre session a expiré. Veuillez vous reconnecter.",
        code: "INVALID_TOKEN"
      });
    }

    // Récupération de l'utilisateur
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Utilisateur introuvable. Veuillez vous reconnecter.",
        code: "USER_NOT_FOUND"
      });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Erreur middleware auth :", err);
    res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur.",
      code: "SERVER_ERROR"
    });
  }
};

module.exports = auth;
