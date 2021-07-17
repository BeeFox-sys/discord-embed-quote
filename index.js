require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();


client.on("message", async (msg) => {

    if (!msg.guild) {

        return;

    }
    if (!msg.content.startsWith("-quote")) {

        return;

    }
    if (!msg.member.roles.cache
        .filter((val, key) => process.env.ROLES.split(",").includes(key)).size) {

        
        return;

    }

    // Msg.channel.send("Hi there!");

    const url = msg.content.split(" ")[1]?.split("/");

    if (!url) {

        return;

    }
    const targetGuild = url[url.length - 3];
    const targetChannel = url[url.length - 2];
    const targetMessage = url[url.length - 1];

    if (targetGuild !== msg.guild.id) {

        return;

    }

    const channel = await client.channels.fetch(targetChannel);

    const message = await channel.messages.fetch(targetMessage);

    const {embeds} = message;

    const caller = await new Discord.MessageEmbed()
        .setFooter(
            `${msg.author.username}`,
            await msg.author.avatarURL({"format": "png"})
        )
        .setDescription(`[jump](${message.url})\nRequested by:`);
    
    await msg.channel.send(embeds);
    await msg.channel.send(caller);

});

client.login(process.env.TOKEN);
