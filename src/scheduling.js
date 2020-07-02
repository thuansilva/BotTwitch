const { Credent } = require("./config/utils");

const scheduling = async (minuts, page, url) => {
  var tentativas = 0;

  setInterval(async () => {
    try {
      if (tentativas == 0) {
        // Colocar tela em modo teatro.
        await page.keyboard.down("Alt");
        await page.keyboard.press("t");
        await page.keyboard.up("Alt");
        tentativas = 1;
      }

      // Caso o Streamer faça uma raid ou o usuário mude de canal!
      // Caso você seja um dev comente o <process.exit()> para quando mudar o programa não termine
      if (page.url() != url) {
        console.log(
          "\n\n ***Você mudou de live ou o Streamer fez uma raid!! ***\n\n ***Bot encerrado! ***"
        );
        process.exit();
      }

      // selecionar o button e dar um click!
      const itemPontos = await page.waitForXPath(Credent.Points_Channel);
      await itemPontos.click();
      console.log("\t * Ganhou +50 pontos!!! * ");
      // Caso Retorne algum erro
    } catch (e) {
      // Caso não tenha pontos disponíveis.
      console.log(Date.now() - "Sem ponto disponível!");

      tentativas++;
    }
  }, minuts);
};
module.exports = scheduling;
