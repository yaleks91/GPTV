import { log } from "console";
import { copyFileSync } from "fs";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { downloadOgg, toMp3 } from "./ogg.js";

const bot = new Telegraf('XXX');


bot.command('start', async (ctx) => {
    try{
        ctx.reply('Well, hello there')
    }catch(err){
        console.log(err);
    }

});

bot.on(message('voice'), async (ctx) => {
    try{
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const userId = String(ctx.message.from.id);
        console.log(userId)
        const oggPath = await downloadOgg(link.href, userId);
        const mp3Path = await toMp3(oggPath, userId);
        await ctx.reply(link.href);
    } catch (err) {
        console.info(err); 
    }

});

bot.on(message('text'), async (ctx) => {
    try{
        console.log(botInstance.chatId)
    }catch(err){
        console.log(err);
    }

    
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
