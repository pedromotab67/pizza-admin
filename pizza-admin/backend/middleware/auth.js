// Middleware de autenticacao JWT - verifica token em rotas protegidas - [Pedro Mota Batista]
const jwt = require('jsonwebtoken');

const SECRET = 'pizzaria_secret_key_2024';

function autenticar(req, res, next) {
  // Extrai o token do header Authorization - [Pedro Mota Batista]
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token nao fornecido. Acesso negado.' });
  }

  // Verifica e decodifica o token JWT - [Pedro Mota Batista]
  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token invalido ou expirado.' });
    }
    req.usuario = usuario;
    next();
  });
}

module.exports = { autenticar, SECRET };
