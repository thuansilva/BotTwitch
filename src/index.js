"use strict";
const puppeteer = require("puppeteer");
const { actionsEnter } = require("./actionsEnter");
const { scheduling } = require("./scheduling");
const prompt = require("prompt-sync")();

// const username = prompt("Login: ");
// const chave = prompt("Senha: ");
// const url = prompt("URL da live: ");

const username = "thuan___";
const chave = "botteste!";
const url = "https://www.twitch.tv/vovo";
console.clear();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=200,1000"],
  });

  const context = browser.defaultBrowserContext();
  await context.clearPermissionOverrides();
  context.overridePermissions(url, ["midi-sysex"]);

  const page = await browser.newPage();
  // Entrar na Conta.
  await actionsEnter(page, username, chave, url);
  // Escalonar as solicitações
  await scheduling(180000, page, url);
})();
