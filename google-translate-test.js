require('dotenv').config();
const Fastify = require('fastify');
const { Translate } = require('@google-cloud/translate').v2;

const fastify = Fastify({ logger: true });
const translate = new Translate();

// Rota
fastify.post('/translate', async (request, reply) => {
  const { text, source, target } = request.body;

  try {
    // Realiza a tradução com os dados fornecidos
    const [translation] = await translate.translate(text, {
      from: source || undefined, // Detecta automaticamente se não informado
      to: target,
    });

    reply.send({ text, translation });
  } catch (err) {
    // Trata erros e responde com status 500
    reply.status(500).send({ error: err.message || 'Erro ao realizar a tradução' });
  }
});

// Inicializa o servidor
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await fastify.listen({ port: PORT });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();