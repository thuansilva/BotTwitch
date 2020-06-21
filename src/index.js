"use strict";
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const { actionsEnter } = require("./actionsEnter");
const { scheduling } = require("./scheduling");
const prompt = require("readline-sync");

const username = prompt.question(chalk.gray.underline("-Login:"));
const chave = prompt.question(chalk.gray.underline("-Senha:"), {
  hideEchoBack: true,
});
const stream = prompt.question(
  chalk.gray.underline("https://www.twitch.tv/<Digite o nome da Stream> ")
);
const url = `-https://www.twitch.tv/${stream}`;
console.clear();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=200,1000"],
    executablePath: "/usr/bin/google-chrome",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions(url, [
    "midi-sysex",
    "midi",
    "microphone",
    "payment-handler",
    "clipboard-read",
  ]);
  context.clearPermissionOverrides();

  const page = await browser.newPage();
  if (page.url == "about:blank") {
    console.log("\t Error na URL");
  }
  // Entrar na Conta.
  await actionsEnter(page, username, chave, url);
  // Escalonar as solicitações
  await scheduling(180000, page, url);
})();
