const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Permitir JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração do e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SEUEMAIL@gmail.com',
    pass: 'SUA_SENHA_DE_APP'
  }
});

// Rota de envio
app.post('/enviar-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: 'SEUEMAIL@gmail.com',
      replyTo: email,
      to: 'SEUEMAIL@gmail.com',
      subject: `Mensagem do site - ${name}`,
      text: `
Nome: ${name}
Email: ${email}

Mensagem:
${message}
      `
    });

    res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});