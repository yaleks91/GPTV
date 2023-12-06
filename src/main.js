import { log } from "console";
import { copyFileSync } from "fs";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { downloadOgg, toMp3 } from "./ogg.js";
import config from "config";
//import openai from './speechToText.js';
import AssemblyAI from 'assemblyai';
import convertSpeechToText from "./speechToText.js";
import main from "./messageToGPT.js";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));


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
        ctx.sendChatAction('typing');
        const userId = String(ctx.message.from.id);
        console.log(userId)
        const oggPath = await downloadOgg(link.href, userId);
        const mp3Path = await toMp3(oggPath, userId);

        const text = await convertSpeechToText(mp3Path); // ответ от Assemblyai
        await ctx.reply(text);
    } catch (err) {
        console.info(err); 
    }

});

bot.hears('test', async (ctx) => {
    ctx.sendChatAction('typing');
    const resp = await main('Can you work at last?');
    console.log(resp);
});



bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
