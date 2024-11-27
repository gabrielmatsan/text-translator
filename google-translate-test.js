require('dotenv').config()
const readline = require('readline')
const { Translate } = require('@google-cloud/translate').v2;


const translate = new Translate();

async function quickStart() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  rl.question('Digite a frase para traduzir: ', (text) => {
    rl.question(
      'Digite o idioma de origem (ex: en para inglês ou deixe em branco para detectar automaticamente): ',
      (source) => {
        rl.question('Digite o idioma de destino (ex: ru para russo): ', async (target) => {
          try {
            const [translation] = await translate.translate(text, {
              from: source || undefined, // Detecta automaticamente se vazio
              to: target,
            });
            console.log(`Texto original: ${text}`);
            console.log(`Tradução: ${translation}`);
          } catch (err) {
            console.error('Erro durante a tradução:', err.message || err);
          } finally {
            rl.close(); 
          }
        });
      }
    );
  });
}

quickStart();