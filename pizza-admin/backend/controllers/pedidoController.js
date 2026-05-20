// Controller de Pedidos - gerencia pedidos com itens, status e valor total - [Pedro Mota Batista]
const { v4: uuidv4 } = require('uuid');
const { pedidos, clientes, produtos } = require('../models/db');

const STATUS_VALIDOS = ['pendente', 'preparando', 'saiu_para_entrega', 'entregue', 'cancelado'];

// Calcula o valor total do pedido com base nos itens - [Pedro Mota Batista]
function calcularTotal(itens) {
  return itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
}

// Lista todos os pedidos - [Pedro Mota Batista]
function listar(req, res) {
  res.json(pedidos);
}

// Busca pedido por ID - [Pedro Mota Batista]
function buscar(req, res) {
  const pedido = pedidos.find(p => p.id === req.params.id);
  if (!pedido) return res.status(404).json({ erro: 'Pedido nao encontrado.' });
  res.json(pedido);
}

// Cria novo pedido - [Pedro Mota Batista]
function criar(req, res) {
  const { clienteId, itens } = req.body;
  if (!clienteId || !itens || !Array.isArray(itens) || itens.length === 0)
    return res.status(400).json({ erro: 'clienteId e itens sao obrigatorios.' });

  // Valida se o cliente existe - [Pedro Mota Batista]
  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) return res.status(404).json({ erro: 'Cliente nao encontrado.' });

  // Valida cada item e busca preco atual do produto - [Pedro Mota Batista]
  const itensValidados = [];
  for (const item of itens) {
    const produto = produtos.find(p => p.id === item.produtoId);
    if (!produto) return res.status(404).json({ erro: `Produto ${item.produtoId} nao encontrado.` });
    itensValidados.push({
      produtoId: produto.id,
      nome: produto.nome,
      quantidade: item.quantidade || 1,
      preco: produto.preco
    });
  }

  const novo = {
    id: uuidv4(),
    clienteId,
    nomeCliente: cliente.nome,
    itens: itensValidados,
    status: 'pendente',
    valorTotal: calcularTotal(itensValidados),
    dataHora: new Date().toISOString()
  };
  pedidos.push(novo);
  res.status(201).json(novo);
}

// Atualiza status do pedido - [Pedro Mota Batista]
function atualizarStatus(req, res) {
  const idx = pedidos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Pedido nao encontrado.' });

  const { status } = req.body;
  if (!STATUS_VALIDOS.includes(status))
    return res.status(400).json({ erro: `Status invalido. Use: ${STATUS_VALIDOS.join(', ')}` });

  pedidos[idx].status = status;
  res.json(pedidos[idx]);
}

// Remove pedido - [Pedro Mota Batista]
function remover(req, res) {
  const idx = pedidos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Pedido nao encontrado.' });
  pedidos.splice(idx, 1);
  res.json({ mensagem: 'Pedido removido com sucesso.' });
}

module.exports = { listar, buscar, criar, atualizarStatus, remover };
