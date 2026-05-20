// Controller de Clientes - CRUD completo com integracao ViaCEP/IBGE - [Pedro Mota Batista]
const { v4: uuidv4 } = require('uuid');
const { clientes } = require('../models/db');

// Lista todos os clientes - [Pedro Mota Batista]
function listar(req, res) {
  res.json(clientes);
}

// Busca cliente por ID - [Pedro Mota Batista]
function buscar(req, res) {
  const cliente = clientes.find(c => c.id === req.params.id);
  if (!cliente) return res.status(404).json({ erro: 'Cliente nao encontrado.' });
  res.json(cliente);
}

// Cria novo cliente - [Pedro Mota Batista]
function criar(req, res) {
  const { nome, telefone, cep, logradouro, numero, bairro, cidade, estado } = req.body;
  if (!nome || !telefone || !cep)
    return res.status(400).json({ erro: 'Nome, telefone e CEP sao obrigatorios.' });

  const novo = {
    id: uuidv4(),
    nome,
    telefone,
    endereco: { cep, logradouro, numero, bairro, cidade, estado },
    criadoEm: new Date().toISOString()
  };
  clientes.push(novo);
  res.status(201).json(novo);
}

// Atualiza cliente - [Pedro Mota Batista]
function atualizar(req, res) {
  const idx = clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Cliente nao encontrado.' });

  const { nome, telefone, cep, logradouro, numero, bairro, cidade, estado } = req.body;
  if (nome)      clientes[idx].nome      = nome;
  if (telefone)  clientes[idx].telefone  = telefone;
  if (cep)       clientes[idx].endereco  = { cep, logradouro, numero, bairro, cidade, estado };

  res.json(clientes[idx]);
}

// Remove cliente - [Pedro Mota Batista]
function remover(req, res) {
  const idx = clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Cliente nao encontrado.' });
  clientes.splice(idx, 1);
  res.json({ mensagem: 'Cliente removido com sucesso.' });
}

module.exports = { listar, buscar, criar, atualizar, remover };
