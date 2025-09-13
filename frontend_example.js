// Exemplo de envio de formulário para o backend intermediário
// Substitua pelo seu código de frontend (React, Vue, etc.)

async function enviarFormulario(dados) {
  try {
    const resposta = await fetch('http://localhost:3001/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    const resultado = await resposta.json();
    console.log('Resultado da API:', resultado);
    // Trate o resultado conforme necessário
  } catch (erro) {
    console.error('Erro ao enviar para o backend:', erro);
  }
}

// Exemplo de uso:
// enviarFormulario({ nome: 'João', email: 'joao@email.com' });
