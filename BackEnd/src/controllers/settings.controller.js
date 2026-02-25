const Settings = require("../models/settings.model");

// GET - récupérer les paramètres
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Si aucun paramètre n'existe, on en crée un
    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération paramètres" });
  }
};

// PUT - mettre à jour les paramètres
exports.updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Erreur mise à jour paramètres" });
  }
};
