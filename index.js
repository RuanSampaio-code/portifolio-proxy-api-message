// Backend intermediário (proxy) seguro para proteger a API Key
// Instale as dependências: npm install express axios dotenv

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

// Endpoint para receber dados do frontend e encaminhar para API Java
app.post('/api/proxy', async (req, res) => {
  try {
    // Dados recebidos do frontend
    const formData = req.body;

    // Configuração do request para API Java
    const response = await axios.post(
      process.env.JAVA_API_URL, // URL da sua API Java
      formData,
      {
        headers: {
          'x-api-key': process.env.API_KEY, // API Key protegida
          'Content-Type': 'application/json',
        },
      }
    );

    // Retorna o resultado para o frontend
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
