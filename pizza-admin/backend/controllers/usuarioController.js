// Controller de Usuarios - gerencia autenticacao e CRUD de usuarios - [Pedro Mota Batista]
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { usuarios } = require('../models/db');
const { SECRET }   = require('../middleware/auth');

// Realiza login e retorna token JWT - [Pedro Mota Batista]
function login(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha)
    return res.status(400).json({ erro: 'Email e senha sao obrigatorios.' });

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario)
    return res.status(404).json({ erro: 'Usuario nao encontrado.' });

  const senhaValida = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaValida)
    return res.status(401).json({ erro: 'Senha incorreta.' });

  // Gera token JWT com validade de 8 horas - [Pedro Mota Batista]
  const token = jwt.sign({ id: usuario.id, email: usuario.email, perfil: usuario.perfil }, SECRET, { expiresIn: '8h' });
  res.json({ token, nome: usuario.nome, perfil: usuario.perfil });
}

// Lista todos os usuarios (rota protegida) - [Pedro Mota Batista]
function listar(req, res) {
  const lista = usuarios.map(({ senha, ...u }) => u);
  res.json(lista);
}

// Cria novo usuario - [Pedro Mota Batista]
function criar(req, res) {
  const { nome, email, senha, perfil } = req.body;
  if (!nome || !email || !senha)
    return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios.' });

  if (usuarios.find(u => u.email === email))
    return res.status(409).json({ erro: 'Email ja cadastrado.' });

  const novo = { id: uuidv4(), nome, email, senha: bcrypt.hashSync(senha, 8), perfil: perfil || 'funcionario' };
  usuarios.push(novo);
  const { senha: _, ...sem } = novo;
  res.status(201).json(sem);
}

// Atualiza usuario existente - [Pedro Mota Batista]
function atualizar(req, res) {
  const idx = usuarios.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Usuario nao encontrado.' });

  const { nome, email, senha, perfil } = req.body;
  if (nome)   usuarios[idx].nome   = nome;
  if (email)  usuarios[idx].email  = email;
  if (senha)  usuarios[idx].senha  = bcrypt.hashSync(senha, 8);
  if (perfil) usuarios[idx].perfil = perfil;

  const { senha: _, ...sem } = usuarios[idx];
  res.json(sem);
}

// Remove usuario - [Pedro Mota Batista]
function remover(req, res) {
  const idx = usuarios.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Usuario nao encontrado.' });
  usuarios.splice(idx, 1);
  res.json({ mensagem: 'Usuario removido com sucesso.' });
}

// Cadastro publico - qualquer pessoa pode se registrar como funcionario - [Pedro Mota Batista]
function cadastroPublico(req, res) {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha)
    return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios.' });

  if (usuarios.find(u => u.email === email))
    return res.status(409).json({ erro: 'Email ja cadastrado.' });

  const novo = { id: uuidv4(), nome, email, senha: bcrypt.hashSync(senha, 8), perfil: 'funcionario' };
  usuarios.push(novo);
  const { senha: _, ...sem } = novo;
  res.status(201).json(sem);
}

module.exports = { login, listar, criar, atualizar, remover, cadastroPublico };
