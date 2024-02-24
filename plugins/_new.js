const { runtime } = require('../lib/runtime'); 
const { dare,
    truth,
    random_question,
    amount_of_questions } = require('../lib/truth-dare'); 
const { Alpha, mode, sleep } = require("../lib");
const util = require('util');
const { Anime, Manga ,Character  } = require("@shineiichijo/marika");
const axios = require('axios');

Alpha({
    pattern: "uptime",
    type: "info",
    desc: "shows bot uptime.",
    fromMe: mode
},
async (message, match) => { 
    const upt = runtime(process.uptime());

    await message.send({
        url: 'https://i.pinimg.com/originals/2b/80/bb/2b80bb2acc3d254124e187fa93373fb3.jpg'
    }, {
        caption: `Beep boop... System status: Fully operational!\n Current runtime: ${upt}`
    }, 'image');
});

Alpha({
    pattern: "character",
    type: "anime",
    desc: "Searches Info about character.",
    fromMe: mode
},
async (message, match) => {
    if (!match) return message.reply(`Please give an anime character name!`);

    const client = new Character();

    const chara = await client.searchCharacter(match).catch((err) => {
        return message.reply(`Couldn't find any result related to ${match}`);
    });

    const formattedMessage = `🏮 **Name:** ${chara.data[0].name}\n` +
                             `🌐 **Source:** _Alpha-md_\n` +
                             `📶 **URL:** ${chara.data[0].url}\n\n` +
                             `📑 **Description:** ${chara.data[0].about}`;

    await message.reply(formattedMessage);
});

Alpha({
    pattern: "define",
    desc: "urban dictionary.",
    type: "fun",
    fromMe: mode
},
async (message, match) => {
    try {
        let x = message.reply_message.text;
        
        if (!x) {
            return message.reply("Please reply to a message to get the definition.");
        }
        let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${x}`);
        
        if (data.list && data.list.length > 0) {
            var textt = 
            ` 📚 Word: ${x}\n` +
             `📖 Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}\n` +
            ` 💬 Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}\n` 
            
            return message.reply(textt);
        } else {
            return message.reply(`❌ No result for ${x}`);
        }
    } catch (error) {
        console.error(error);
        return message.reply("❌ An error occurred while fetching the definition.");
    }
});


Alpha({
    pattern: "npm",
    desc: "gives info on requested npm package.",
    type: "search",
    fromMe: mode
},
async(message, match) => {
    if (!match) return message.reply('Please give me package name.📦')
    axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
        let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
        message.reply(txt)
    }).catch(e => console.log(e))
}
)

Alpha({
    pattern: "wm",
    desc: "Makes wa.me of quoted or mentioned user.",
    type: "misc",
    fromMe: mode
},
async(message, match) => {
    let users = message.mentionedJid ? message.mentionedJid[0].split('@')[0] : message.quoted ? message.quoted.sender.split('@')[0] : text.replace('@')[0]
   return message.reply(`https://wa.me/${users}`)

}
)


Alpha({
    pattern: "fliptext",
    desc: "Flips given text.",
    type: "misc",
    fromMe: mode
},
async(message, match) => {
    let n = message.reply_message.text;
        if (!n) {
        return message.reply("Please reply to a message to flip it");
    }
    flipped = n.split('').reverse().join('')
    message.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${n}\n*Fliped text :*\n${flipped}`)

}
)

Alpha({
    pattern: "animequote",
    desc: "Sends random anime quotes in chat.",
    type: "anime",
    fromMe: mode
},
    async (message, match) => {
        try {
            const res = await fetch('https://some-random-api.com/animu/quote');
            if (!res.ok) throw await res.text();
            const json = await res.json();
            const { sentence, character, anime } = json;
            await message.reply(`📜𝐐𝐔𝐎𝐓𝐄:\n${sentence}\n\n👤𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑: \`\`\`${character}\`\`\`\n🌟𝐀𝐍𝐈𝐌𝐄: \`\`\`${anime}\`\`\`\n`);
        } catch (error) {
            console.error(error);
        }
    });

    Alpha({
        pattern: "question",
        desc: "Random Question.",
        type: "fun",
       fromMe: mode },
    async(message, match) => {
        return await message.reply(`${random_question()}`);
    }
)
//---------------------------------------------------------------------------
Alpha({
        pattern: "truth",
        desc: "truth and dare(truth game.).",
        type: "fun",
        fromMe: mode
       },
    async(message, match) => {
        return await message.reply(`${truth()}`);
    }
)
//---------------------------------------------------------------------------
Alpha({
        pattern: "dare",
        desc: "truth and dare(dare game.).",
        type: "fun",
       fromMe: mode,
    },
    async(message, match) => {
        return await message.reply(`${dare()}`);
    }
)
//---------------------------------------------------------------------------
Alpha({
    pattern: "fact",
    desc: "Sends fact in chat.",
    type: "fun",
fromMe: mode
},
async(message, match) => {
    const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
    return message.reply(`*Fact:* ${data.fact}\n\n*Powered by Alpha-md*`)   
}

)
//---------------------------------------------------------------------------
Alpha({
    pattern: "quotes",
    desc: "Sends quotes in chat.",
    type: "fun",
fromMe: mode
},
async(message, match) => {
    var qut = await axios.get(`https://favqs.com/api/qotd`)
    const replyf = `
 *🎗️Content:* ${qut.data.quote.body}\n\n
 *👤Author:* ${qut.data.quote.author}`
return message.reply(replyf)
})

Alpha({
    pattern: "tinyurl",
    desc: "Makes url tiny.",
    type: "misc",
    fromMe: mode
},
async(message, match) => {
    let j = message.reply_message.text;
        
        if (!j) {
            return message.reply("Please reply to a url to shorten it.");
        }
    try {
        link = j.split(" ")[0];
        anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        message.reply(`*🛡️Your Shortened URL*\n\n${anu.data}`);
    } catch (e) {
        console.log(e);
    }
}
)

Alpha({
    pattern: "getqr",
    type: "misc",
    desc: "Sends Alpha's Qr code to chat so you can scan and get your session id.",
    fromMe: mode
},
async(message, match) => {
   await message.send({
        url: 'https://h-6g6q.onrender.com/'
    }, {
        caption: `_*Scan Qr within 15 seconds_*\nYou'll get session id in your log number.`
    }, 'image');
    await sleep(20 * 1000)
    return message.reply("your session is now over.");
})
