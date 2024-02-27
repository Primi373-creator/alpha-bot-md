const toBool = (x) => x == "true";
const { existsSync } = require("fs");
const { Sequelize } = require("sequelize");
if (existsSync(".env"))
  require("dotenv").config({ path: "./.env" });
process.env.NODE_OPTIONS = "--max_old_space_size=2560"; //2.5
const DB_URL = process.env.DATABASE_URL || "postgres://cipher:1Xw6GLAzeZgO9yz35lxFNeW3M2OM0Hxp@dpg-cne3phmg1b2c739oupb0-a.oregon-postgres.render.com/alphaapi";
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "inrl~2c231oy1sba8df7bf198736d18568bb8349a", //your ssid to run bot
  HEROKU: {
    API_KEY: process.env.HEROKU_API_KEY,
    APP_NAME: process.env.HEROKU_APP_NAME,
  },
  PORT: process.env.PORT || 3067,
  BASE_URL: "https://upper-romy-inrl-bot.koyeb.app/",
  ALPHA_URL: "https://api.alpha-md.rf.gd/",
  REPO: "Primi373-creator/inrl-bot-md",
  BGM_URL: process.env.BGM_URL || "null",
  REJECT_CALL: toBool(process.env.REJECT_CALL || "true"),
  BADWORD_BLOCK: toBool(process.env.BADWORD_BLOCK || "false"),
  ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE || "true"),
  PM_BLOCK: toBool(process.env.PM_BLOCK || "false"),
  BGMBOT: toBool(process.env.BGMBOT || "false"),
  CALL_BLOCK: toBool(process.env.CALL_BLOCK || "false"),
  STATUS_VIEW: process.env.STATUS_VIEW || "true",
  SAVE_STATUS: toBool(process.env.SAVE_STATUS || "true"),
  ADMIN_SUDO_ACCESS: toBool(process.env.ADMIN_SUDO_ACCESS || "true"),
  DISABLE_PM: toBool(process.env.DISABLE_PM || "false"),
  DISABLE_GRP: toBool(process.env.DISABLE_GRP || "false"),
  ERROR_MSG: toBool(process.env.ERROR_MSG || "true"),
  AJOIN: toBool(process.env.AJOIN || "false"),
  READ: process.env.READ || "false", //true, command
  CHATBOT: process.env.CHATBOT || "false", //true, pm, group
  REACT: process.env.REACT || "false", //true, command, emoji
  WARNCOUND: process.env.WARNCOUND || 3,
  BOT_INFO:
    process.env.BOT_INFO || "Alpha-md;Cipher;https://i.imgur.com/DyLAuEh.jpg",
  WORKTYPE: process.env.WORKTYPE || "private",
  PREFIX: process.env.PREFIX || "#", //both  .  and [.] equal, for multi prefix we use [] this
  LANG: process.env.LANG || "en",
  PERSONAL_MESSAGE: process.env.PERSONAL_MESSAGE || "null",
  BOT_PRESENCE: process.env.BOT_PRESENCE || "available",
  AUDIO_DATA:
    process.env.AUDIO_DATA ||
    "Alpha-md;Cipher;https://i.imgur.com/DyLAuEh.jpg",
  STICKER_DATA: process.env.STICKER_DATA || "Cipher;Alpha-md",
  BRAINSHOP: process.env.BRAINSHOP || "172372,nbjE0YAlyw3cpoMl",
  SUDO: process.env.SUDO || "2349150690169, 2348114860536",
  RMBG_KEY: process.env.RMBG_KEY,
  OPEN_AI: process.env.OPEN_AI,
  ELEVENLABS: process.env.ELEVENLABS,
  INRL_KEY: process.env.INRL_KEY || "free50_inrl",
  ALPHA_KEY: process.env.ALPHA_KEY || "12d2fde7",
  OCR_KEY: (process.env.OCR_KEY || "K84003107488957").trim(),
  DATABASE: DB_URL
    ? new Sequelize(DB_URL, {
        dialect: "postgres",
        ssl: true,
        protocol: "postgres",
        dialectOptions: {
          native: true,
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      })
    : new Sequelize({
        dialect: "sqlite",
        storage: "./database.db",
        logging: false,
      }),
};
