const { Credent, Code } = require("./config/utils");
const prompt = require("prompt-sync")();

const actionsEnter = async (page, username, chave, url) => {
  await page.goto(url);
  // Passso para realizar o login.

  const buttonLogin = await page.waitForXPath(Credent.buttonLogin);
  buttonLogin.click();
  const login = await page.waitForXPath(Credent.login);
  await login.type(username);
  const senha = await page.waitForXPath(Credent.senha);
  // await senha.type(chave);
  // const buttonEnter = await page.waitForXPath(Credent.buttonEnter);
  // await buttonEnter.click();

  // console.log("\nDigite o codigo enviado para o seu email,\n\n");

  // // Input do código de vericação.
  // try {
  //   const codeinput = await page.waitForXPath(Code);
  //   const codeEmail = prompt("\tCodigo: ");
  //   await codeinput.type(codeEmail);
  // } catch {
  //   console.log("Login não realizado!");
  //   process.exit();
  // }

  console.clear();
  console.log("Verifique se foi realizado o login na pagina.\nBot Rodando!");
};
module.exports = {
  actionsEnter,
};
