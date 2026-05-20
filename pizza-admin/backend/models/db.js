// Banco de dados em memoria - simula persistencia de dados - [Pedro Mota Batista]
const bcrypt = require('bcryptjs');

// Usuario admin padrao ja criado para facilitar o primeiro acesso - [Pedro Mota Batista]
const usuarios = [
  {
    id: '1',
    nome: 'Admin',
    email: 'admin@pizzaria.com',
    senha: bcrypt.hashSync('admin123', 8),
    perfil: 'admin'
  }
];

const clientes = [];
const produtos  = [];
const pedidos   = [];

module.exports = { usuarios, clientes, produtos, pedidos };
