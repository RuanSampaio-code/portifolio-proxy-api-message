require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// --- INÍCIO DA ALTERAÇÃO ---

// Pega a URL permitida da variável de ambiente.
// NUNCA deixe '*' em produção para requisições com credenciais!
const allowedOrigin = 'https://jruandev-portifolio.vercel.app';

const corsOptions = {
  // A origem permitida deve ser a URL EXATA do seu frontend
  origin: allowedOrigin,
  
  // Esta linha é a CHAVE para resolver seu problema!
  credentials: true, 

  // Métodos que seu frontend tem permissão para usar
  methods: ['GET', 'POST'], 
};

// Usa a nova configuração do CORS
app.use(cors(corsOptions));

// --- FIM DA ALTERAÇÃO ---


// Endpoint para receber dados do frontend e encaminhar para API Java
app.post('/api/proxy', async (req, res) => {
  try {
    const formData = req.body;

    const response = await axios.post(
      process.env.JAVA_API_URL,
      formData,
      {
        headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy backend rodando na porta ${PORT}`);
});