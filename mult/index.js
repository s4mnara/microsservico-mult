
const express = require('express');
const app = express();
const PORT = 3000;


app.get('/mult', (req, res) => {
  const op1 = Number(req.query.op1);
  const op2 = Number(req.query.op2);

  if (isNaN(op1) || isNaN(op2)) {
    console.log(`Requisição inválida recebida: op1=${req.query.op1}, op2=${req.query.op2}`);
    return res.status(400).json({ error: "Parâmetros op1 e op2 devem ser números" });
  }

  const result = op1 * op2;

  // Log detalhado da requisição
  console.log(`[${new Date().toISOString()}] Requisição recebida: op1=${op1}, op2=${op2}, result=${result}`);

  res.json({ op1, op2, result });
});


app.listen(PORT, () => {
  console.log(`Mult service rodando na porta ${PORT}`);
});
