const fs = require("fs-extra");
const { sequelize } = global.db;

module.exports = {
	config: {
		name: "jsontosqlite",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Đồng bộ dữ liệu từ json sang sqlite",
			en: "Synchronize data from json to sqlite"
		},
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: {
			vi: "   {pn} <thread | user | dashboard | global | all>: Sẽ đồng bộ dữ liệu từ data json được lưu trong thư mục database/data sang sqlite\n\n   Lưu ý: Nếu dữ liệu đã tồn tại trong sqlite thì sẽ được cập nhật lại",
			en: "   {pn} <thread | user | dashboard | global | all>: Will synchronize data from json data stored in the database/data folder to sqlite\n\n   Note: If the data already exists in sqlite, it will be updated"
		}
	},

	langs: {
		vi: {
			invalidDatabase: "❌ Vui lòng chuyển database sang sqlite trong config sau đó khởi động lại bot để sử dụng lệnh này",
			missingFile: "❌ Bạn chưa sao chép dữ liệu file %1 vào thư mục database/data",
			formatInvalid: "❌ Định dạng dữ liệu không hợp lệ",
			error: "❌ Đã có lỗi xảy ra:\n%1: %2",
			successThread: "✅ Đã đồng bộ dữ liệu nhóm từ json sang sqlite thành công!",
			successUser: "✅ Đã đồng bộ dữ liệu người dùng từ json sang sqlite thành công!",
			successDashboard: "✅ Đã đồng bộ dữ liệu dashboard từ json sang sqlite thành công!",
			successGlobal: "✅ Đã đồng bộ dữ liệu global từ json sang sqlite thành công!"
		},
		en: {
			invalidDatabase: "❌ Please switch database to sqlite in config then restart the bot to use this command",
			missingFile: "❌ You haven't copied the data file %1 into the database/data folder",
			formatInvalid: "❌ Data format is invalid",
			error: "❌ An error occurred:\n%1: %2",
			successThread: "✅ Successfully synchronized thread data from json to sqlite!",
			successUser: "✅ Successfully synchronized user data from json to sqlite!",
			successDashboard: "✅ Successfully synchronized dashboard data from json to sqlite!",
			successGlobal: "✅ Successfully synchronized global data from json to sqlite!"
		}
	},

	onStart: async function ({ args, message, threadModel, userModel, dashBoardModel, globalModel, getLang }) {
		if (global.GoatBot.config.database.type !== "sqlite")
			return message.reply(getLang("invalidDatabase"));

		switch (args[0]) {
			case "thread": {
				return await syncThreadData(message, threadModel, getLang);
			}
			case "user": {
				return await syncUserData(message, userModel, getLang);
			}
			case "dashboard": {
				return await syncDashBoardData(message, dashBoardModel, getLang);
			}
			case "global": {
				return await syncGlobalData(message, globalModel, getLang);
			}
			case "all": {
				await syncThreadData(message, threadModel, getLang);
				await syncUserData(message, userModel, getLang);
				await syncDashBoardData(message, dashBoardModel, getLang);
				await syncGlobalData(message, globalModel, getLang);
				return;
			}
			default:
				return message.SyntaxError();
		}
	}
};

async function syncThreadData(message, threadModel, getLang) {
	let oldThreadsData;
	const pathThreadData = `${process.cwd()}/database/data/threadsData.json`;
	if (!fs.existsSync(pathThreadData))
		return message.reply(getLang("missingFile", pathThreadData.split("/").pop()));

	try {
		oldThreadsData = require(pathThreadData);
		delete require.cache[require.resolve(pathThreadData)];
	}
	catch (err) {
		return message.reply(getLang("formatInvalid"));
	}

	try {
		await sequelize.transaction(async (transaction) => {
			for (const thread of oldThreadsData) {
				const threadIndex = global.db.allThreadData.findIndex(item => item.threadID == thread.threadID);

				if (threadIndex === -1) {
					await threadModel.create(thread, { transaction });
				}
				else {
					await threadModel.update(thread, { where: { threadID: thread.threadID }, transaction });
				}
			}
		});

		const allThreadData = await threadModel.findAll();
		global.db.allThreadData = allThreadData.map(thread => thread.get({ plain: true }));

		return message.reply(getLang("successThread"));
	}
	catch (err) {
		return message.reply(getLang("error", err.name, err.message));
	}
}

async function syncUserData(message, userModel, getLang) {
	let oldUsersData;
	const pathUserData = `${process.cwd()}/database/data/usersData.json`;
	if (!fs.existsSync(pathUserData))
		return message.reply(getLang("missingFile", pathUserData.split("/").pop()));

	try {
		oldUsersData = require(pathUserData);
		delete require.cache[require.resolve(pathUserData)];
	}
	catch (err) {
		return message.reply(getLang("formatInvalid"));
	}

	try {
		await sequelize.transaction(async (transaction) => {
			for (const user of oldUsersData) {
				const userIndex = global.db.allUserData.findIndex(item => item.userID == user.userID);

				if (userIndex === -1) {
					await userModel.create(user, { transaction });
				}
				else {
					await userModel.update(user, { where: { userID: user.userID }, transaction });
				}
			}
		});

		const allUserData = await userModel.findAll();
		global.db.allUserData = allUserData.map(user => user.get({ plain: true }));

		return message.reply(getLang("successUser"));
	}
	catch (err) {
		return message.reply(getLang("error", err.name, err.message));
	}
}

async function syncDashBoardData(message, dashBoardModel, getLang) {
	let oldDashBoardData;
	const pathDashBoardData = `${process.cwd()}/database/data/dashBoardData.json`;
	if (!fs.existsSync(pathDashBoardData))
		return message.reply(getLang("missingFile", pathDashBoardData.split("/").pop()));

	try {
		oldDashBoardData = require(pathDashBoardData);
		delete require.cache[require.resolve(pathDashBoardData)];
	}
	catch (err) {
		return message.reply(getLang("formatInvalid"));
	}

	try {
		await sequelize.transaction(async (transaction) => {
			for (const dashboard of oldDashBoardData) {
				const dashboardIndex = global.db.dashBoardData.findIndex(item => item.email == dashboard.email);

				if (dashboardIndex === -1) {
					await dashBoardModel.create(dashboard, { transaction });
				}
				else {
					await dashBoardModel.update(dashboard, { where: { email: dashboard.email }, transaction });
				}
			}
		});

		const allDashBoardData = await dashBoardModel.findAll();
		global.db.dashBoardData = allDashBoardData.map(dashboard => dashboard.get({ plain: true }));

		return message.reply(getLang("successDashboard"));
	}
	catch (err) {
		return message.reply(getLang("error", err.name, err.message));
	}
}

async function syncGlobalData(message, globalModel, getLang) {
	let oldGlobalData;
	const pathGlobalData = `${process.cwd()}/database/data/globalData.json`;
	if (!fs.existsSync(pathGlobalData))
		return message.reply(getLang("missingFile", pathGlobalData.split("/").pop()));

	try {
		oldGlobalData = require(pathGlobalData);
		delete require.cache[require.resolve(pathGlobalData)];
	}
	catch (err) {
		return message.reply(getLang("formatInvalid"));
	}

	try {
		await sequelize.transaction(async (transaction) => {
			for (const global_ of oldGlobalData) {
				const globalIndex = global.db.allGlobalData.findIndex(item => item.key == global_.key);

				if (globalIndex === -1) {
					await globalModel.create(global_, { transaction });
				}
				else {
					await globalModel.update(global_, { where: { key: global_.key }, transaction });
				}
			}
		});

		const allGlobalData = await globalModel.findAll();
		global.db.allGlobalData = allGlobalData.map(global_ => global_.get({ plain: true }));

		return message.reply(getLang("successGlobal"));
	}
	catch (err) {
		return message.reply(getLang("error", err.name, err.message));
	}
}
