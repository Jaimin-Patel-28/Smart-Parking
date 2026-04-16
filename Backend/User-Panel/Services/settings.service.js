const Settings = require("../models/Settings");

const getOrCreateSettings = async (userId) => {
	let settings = await Settings.findOne({ user: userId });

	if (!settings) {
		settings = await Settings.create({ user: userId });
	}

	return settings;
};

const updateUserSettings = async (userId, updateData = {}) => {
	const settings = await getOrCreateSettings(userId);

	if (updateData.notifications) {
		settings.notifications = {
			...settings.notifications.toObject(),
			...updateData.notifications,
		};
	}

	if (updateData.preferences) {
		settings.preferences = {
			...settings.preferences.toObject(),
			...updateData.preferences,
		};
	}

	if (updateData.reminders) {
		settings.reminders = {
			...settings.reminders.toObject(),
			...updateData.reminders,
		};
	}

	if (updateData.autoFeatures) {
		settings.autoFeatures = {
			...settings.autoFeatures.toObject(),
			...updateData.autoFeatures,
		};
	}

	if (updateData.appSettings) {
		settings.appSettings = {
			...settings.appSettings.toObject(),
			...updateData.appSettings,
		};
	}

	await settings.save();
	return settings;
};

module.exports = {
	getOrCreateSettings,
	updateUserSettings,
};
