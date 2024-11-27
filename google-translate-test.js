require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const readline = require('readline'); // Importa biblioteca para entrada do usuário
const { Translate } = require('@google-cloud/translate').v2; // Importa a biblioteca Google Cloud Translate

// Instancia o cliente usando credenciais padrão
const translate = new Translate();

async function quickStart() {
  // Configura o readline para entrada interativa do usuário
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Solicita ao usuário os dados necessários
  rl.question('Digite a frase para traduzir: ', (text) => {
    rl.question(
      'Digite o idioma de origem (ex: en para inglês ou deixe em branco para detectar automaticamente): ',
      (source) => {
        rl.question('Digite o idioma de destino (ex: ru para russo): ', async (target) => {
          try {
            // Realiza a tradução
            const [translation] = await translate.translate(text, {
              from: source || undefined, // Detecta automaticamente se vazio
              to: target,
            });
            console.log(`Texto original: ${text}`);
            console.log(`Tradução: ${translation}`);
          } catch (err) {
            console.error('Erro durante a tradução:', err.message || err);
          } finally {
            rl.close(); // Encerra o readline
          }
        });
      }
    );
  });
}

// Executa a função principal
quickStart();