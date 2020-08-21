var down = require("./download")
var fs = require('fs')
var ffmpeg = require("./parcha")
const MP3Cutter = require('mp3-cutter');
const TelegramBot = require('node-telegram-bot-api');

const token = '1237014736:AAGpauf2nvq1NsCFNfe7Vj3Y3gCB87sJH9E';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('audio', (msg) => {
  const chatId = msg.chat.id;
  var fileid = msg.audio.file_id;
  bot.getFileLink(fileid).then(
    res=>{
      down.download(res,chatId+".mp3")
    })
          if(fs.existsSync(chatId+".mp3")){
            MP3Cutter.cut({
        src: chatId+".mp3",
        target: `${chatId}t.mp3`,
        start: 25,
        end: 70,
    })
  }
        //bot.sendVoice(chatId,chatId+".ogg")
  });