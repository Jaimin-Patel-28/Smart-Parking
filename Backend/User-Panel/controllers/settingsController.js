const {
  getOrCreateSettings,
  updateUserSettings,
} = require("../Services/settings.service");

/*
GET SETTINGS
*/
exports.getSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = await getOrCreateSettings(userId);

    res.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
UPDATE SETTINGS
*/
exports.updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const settings = await updateUserSettings(userId, updateData);

    res.json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
