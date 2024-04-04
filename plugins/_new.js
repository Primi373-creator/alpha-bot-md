const { runtime } = require("../lib");
const { Alpha, mode, sleep } = require("../lib");

const imgUrls = [
  "https://i.pinimg.com/originals/61/bb/fd/61bbfdf933624a41683becdaeb2577b1.jpg",
  "https://i.pinimg.com/originals/c3/07/c6/c307c6078cc34324638ae0edf72bf022.jpg",
  "https://i.pinimg.com/originals/4b/d9/a8/4bd9a8e554423cd2afa3ab28653954ff.jpg",
  "https://i.pinimg.com/originals/bc/b5/f5/bcb5f54ad8a4929d147f0ceb42a31148.jpg",
  "https://i.pinimg.com/originals/72/21/4d/72214db0f10991b7bcafb0da8a734707.jpg",
  "https://i.pinimg.com/originals/77/44/39/774439b543fe8bc8f7dcc4936dc3742d.jpg",
  "https://i.pinimg.com/originals/ae/d2/01/aed201f1242b6bf70cfeb8584328402a.jpg",
  "https://i.pinimg.com/originals/16/8e/ca/168eca102cb9a88acd413b7be05d25b9.jpg",
];

function getRandomImageUrl() {
  const randomIndex = Math.floor(Math.random() * imgUrls.length);
  return imgUrls[randomIndex];
}

const randomImageUrl = getRandomImageUrl();
Alpha(
  {
    pattern: "uptime",
    pattern: "runtime",
    type: "info",
    desc: "shows bot uptime.",
    fromMe: mode,
  },
  async (message, match) => {
    const upt = runtime(process.uptime());

    await message.send(
      {
        url: randomImageUrl,
      },
      {
        caption: `Beep boop... System status: Fully operational!\n Current runtime: ${upt}`,
      },
      "image",
    );
  },
);

Alpha(
  {
    pattern: "getqr",
    type: "misc",
    desc: "Sends Alpha's Qr code to chat so you can scan and get your session id.",
    fromMe: mode,
  },
  async (message, match) => {
    await message.send(
      {
        url: "https://h-6g6q.onrender.com/",
      },
      {
        caption: `_*Scan Qr within 15 seconds_*\nYou'll get session id in your log number.`,
      },
      "image",
    );
    await sleep(20 * 1000);
    return message.reply("your session is now over.");
  },
);
