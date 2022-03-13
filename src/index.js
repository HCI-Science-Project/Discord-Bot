"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
var dotenv = require("dotenv");
var result = dotenv.config();
if (result.error)
    throw result.error;
var TOKEN = result.parsed.TOKEN;
var PREFIX = result.parsed.PREFIX;
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
exports.client.once("ready", function () {
    console.log("[CLIENT] Logged in to Discord as ".concat(exports.client.user.tag));
    // Register commands into discord
    var commands = exports.client.guilds.cache.get("952100696587640842").commands;
    var commandFiles = (0, fs_1.readdirSync)("./src/slash-commands").filter(function (file) { return file.endsWith(".js"); });
    var _loop_1 = function (file) {
        var command = require("./slash-commands/".concat(file));
        if (command.data) {
            commands === null || commands === void 0 ? void 0 : commands.create(command.data.toJSON()).catch(function (error) { return console.log(error); }).then(function () { return console.log("[SLASH COMMANDS]: Successfully loaded command \"".concat(command.data.name, "\"")); });
        }
    };
    for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
        var file = commandFiles_1[_i];
        _loop_1(file);
    }
});
exports.client.on("messageCreate", function (message) {
    if (message.author === exports.client.user)
        return;
    if (!message.content.startsWith(PREFIX))
        return;
    var command = message.content.split(" ")[0].replace(".", "").toLowerCase();
    var func = require("./text-commands/".concat(command));
    try {
        func.execute(message);
    }
    catch (_a) {
        console.log("[TEXT COMMAND] Error executing command, or command doesn't exist");
    }
});
exports.client.on("interactionCreate", function (interaction) {
    if (!interaction.isCommand())
        return;
    var func = require("./slash-commands/".concat(interaction.commandName));
    try {
        func.execute(interaction);
    }
    catch (_a) {
        console.log("[SLASH COMMANDS]: An error occured running a command");
    }
});
exports.client.login(TOKEN);
