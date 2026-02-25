const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settings.controller");
const auth = require("../middlewares/auth.middleware");
const adminAuth = require("../middlewares/admin.middleware");

router.get("/", getSettings);
router.put("/", auth, adminAuth, updateSettings);

module.exports = router;
