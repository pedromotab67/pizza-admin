// Controller de Produtos - pizzas, bebidas e sobremesas - [Pedro Mota Batista]
const { v4: uuidv4 } = require('uuid');
const { produtos } = require('../models/db');

const CATEGORIAS_VALIDAS = ['pizza', 'bebida', 'sobremesa'];

// Lista todos os produtos, com filtro opcional por categoria - [Pedro Mota Batista]
function listar(req, res) {
  const { categoria } = req.query;
  if (categoria) {
    return res.json(produtos.filter(p => p.categoria === categoria));
  }
  res.json(produtos);
}

// Busca produto por ID - [Pedro Mota Batista]
function buscar(req, res) {
  const produto = produtos.find(p => p.id === req.params.id);
  if (!produto) return res.status(404).json({ erro: 'Produto nao encontrado.' });
  res.json(produto);
}

// Cria novo produto - [Pedro Mota Batista]
function criar(req, res) {
  const { nome, descricao, preco, categoria } = req.body;
  if (!nome || !preco || !categoria)
    return res.status(400).json({ erro: 'Nome, preco e categoria sao obrigatorios.' });

  if (!CATEGORIAS_VALIDAS.includes(categoria))
    return res.status(400).json({ erro: `Categoria invalida. Use: ${CATEGORIAS_VALIDAS.join(', ')}` });

  const novo = { id: uuidv4(), nome, descricao: descricao || '', preco: parseFloat(preco), categoria, criadoEm: new Date().toISOString() };
  produtos.push(novo);
  res.status(201).json(novo);
}

// Atualiza produto - [Pedro Mota Batista]
function atualizar(req, res) {
  const idx = produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Produto nao encontrado.' });

  const { nome, descricao, preco, categoria } = req.body;
  if (categoria && !CATEGORIAS_VALIDAS.includes(categoria))
    return res.status(400).json({ erro: `Categoria invalida. Use: ${CATEGORIAS_VALIDAS.join(', ')}` });

  if (nome)      produtos[idx].nome      = nome;
  if (descricao) produtos[idx].descricao = descricao;
  if (preco)     produtos[idx].preco     = parseFloat(preco);
  if (categoria) produtos[idx].categoria = categoria;

  res.json(produtos[idx]);
}

// Remove produto - [Pedro Mota Batista]
function remover(req, res) {
  const idx = produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Produto nao encontrado.' });
  produtos.splice(idx, 1);
  res.json({ mensagem: 'Produto removido com sucesso.' });
}

module.exports = { listar, buscar, criar, atualizar, remover };
