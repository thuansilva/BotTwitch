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
          "\n\nVocê mudou de live ou o Streamer fez uma raid!!\n\nBot encerrado!"
        );
        process.exit();
      }

      // selecionar o button e dar um click!
      const itemPontos = await page.waitForXPath(Credent.Points_Channel);
      await itemPontos.click().then(function (resolve) {
        console.log("\tGanhou +50 pontos!!!");
        tentativas = 1;
      });
      // Caso Retorne algum erro
    } catch (e) {
      // Caso ultrapasse a quantidade de tentativas.
      if (tentativas === 10) {
        console.log("\n\nNumero de Tentativas excedido\n\nBot encerrado!");
        process.exit();
      }
      // Caso não tenha pontos disponíveis.
      console.log(`${tentativas}-Não existe ponto disponível!`);

      tentativas++;
    }
  }, minuts);
};
module.exports = {
  scheduling,
};
