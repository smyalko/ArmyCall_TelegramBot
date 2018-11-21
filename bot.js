const TelegramBot = require('node-telegram-bot-api');


// Telegram bot token
const token = '781493438:AAEy39ayLQuc1exr3S1F5eRXWHC6GaAzblU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});

//Chats array, to save state for few chats
var chats = new Array(0);

//Function to get random integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//React on command /new_sesiya@rv_voenkom_bot, and create new state for specific chat
bot.onText(/\/new_sesiya@rv_voenkom_bot/, (msg, match) => {
    chats[msg.chat.id] = new Array(0);
    bot.sendMessage(msg.chat.id, "Напишіть /want_povistka@rv_voenkom_bot для участі");
});

//React on command /new_sesiya@rv_voenkom_bot, and add user to chat state
bot.onText(/\/want_povistka@rv_voenkom_bot/, (msg, match) => {

    if (msg.from.username == "unfedined") {
        bot.sendMessage(msg.chat.id, msg.from.first_name + ", встанови @юзернейм");
        return;
    }

    if (typeof chats[msg.chat.id] == 'undefined') {
        bot.sendMessage(msg.chat.id, "Нажаль ніякого призиву не відкрито, створіть нову сесію /new_sesiya@rv_voenkom_bot");
    } else {
        chats[msg.chat.id].push(msg.from.username);
        bot.sendMessage(msg.chat.id, "О, ви на сесію, @" + msg.from.username);
    }
});

//React on command /new_sesiya@rv_voenkom_bot, and print chat state
bot.onText(/\/prizyv@rv_voenkom_bot/, (msg, match) => {
    if (prizyv) {
        var users = "Список студентів: ";

        for (var i = 0; i < chats[msg.chat.id].length; i++) {
            users += chats[msg.chat.id][i];

            if (i < chats[msg.chat.id].length - 1) {
                users += ",";
            }
        }

        bot.sendMessage(msg.chat.id, users);
    } else {
        bot.sendMessage(msg.chat.id, "Нажаль ніякого призиву не відкрито");
    }
});

//React on command /new_sesiya@rv_voenkom_bot, and get random user from chat to send "povistka"
bot.onText(/\/povistka@rv_voenkom_bot/, (msg, match) => {
    try {
        var chat = chats[msg.chat.id];
        var soldier_user = chat[getRndInteger(0, chats.length)];
        bot.sendMessage(msg.chat.id, "І так.. осінній призив..");
        bot.sendMessage(msg.chat.id, "@" + soldier_user + ", відкрийте, двері, вам повістка");
    } catch (exception) {
        console.log(exception);
    }
});