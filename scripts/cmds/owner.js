const { GoatWrapper } = require("fca-liane-utils");
const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "opu sense",
    usePrefix: false,
    longDescription: "info about bot and owner",
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://imgur.com/4XWKKPP.jpeg";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const ment = [{ id: id, tag: name }];
    const a = "";
    const b = "";
    const c = "";
const e = "";
    const d = "";
const f = "";
const g = "";

    message.reply({ 
      body: `🍒𝐎𝐰𝐧𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧🌸\n\n\n- 🙋‍♂️𝐍𝐚𝐦𝐞: 𝗼𝗽𝘂 𝘀𝗲𝗻𝘀𝗲(•◡•)\n\n- 🌸𝐀𝐠𝐞 : N/A\n\n- 🌸 𝗖𝗹𝗮𝘀𝘀: 𝟭𝟬\n\n- 🌸 𝐅𝐫𝐨𝐦 : 𝘁𝗼𝗸𝘆𝗼, 𝗷𝗮𝗽𝗮𝗻\n\n - 🌸 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: 𝐒𝐢𝐧𝐠𝐥𝐞\n\n- 🌸 𝐏𝐫𝐨𝐟𝐢𝐥𝐞: https://www.facebook.com/opusense n\n- 🌸 𝐇𝐨𝐛𝐛𝐢𝐞𝐬: ✨ 𝗪𝗮𝘁𝗰𝗵𝗶𝗻𝗴 𝗮𝗻𝗶𝗺𝗲✨ 𝗥𝗲𝗮𝗱𝗶𝗻𝗴 𝗺𝗮𝗻𝗴𝗮✨ 𝗚𝗼𝗶𝗻𝗴 𝗳𝗼𝗿 𝗹𝗮𝘁𝗲 𝗻𝗶𝗴𝗵𝘁 𝘄𝗮𝗹𝗸𝘀✨ 𝗠𝗮𝗸𝗶𝗻𝗴 𝗵𝗶𝗺 𝗵𝗮𝗽𝗽𝘆.\n\n- 𝗹𝗼𝘃𝗲 𝗮𝗹𝗹 𝗮𝗻𝗶𝗺𝗲 𝘄𝗮𝘁𝗰𝗵𝗲𝗿 🫶💝n`,
mentions: ment,
      attachment: attachment });
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
