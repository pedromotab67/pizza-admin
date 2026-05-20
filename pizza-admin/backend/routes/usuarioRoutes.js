// Rotas de Usuarios com documentacao Swagger - [Pedro Mota Batista]
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/usuarioController');
const { autenticar } = require('../middleware/auth');

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza login e retorna token JWT
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string, example: admin@pizzaria.com }
 *               senha: { type: string, example: admin123 }
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna token JWT
 *       401:
 *         description: Credenciais invalidas
 */
router.post('/login', ctrl.login);
router.post('/cadastro', ctrl.cadastroPublico);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: Nao autorizado
 */
router.get('/', autenticar, ctrl.listar);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria novo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               senha: { type: string }
 *               perfil: { type: string, enum: [admin, funcionario] }
 *     responses:
 *       201:
 *         description: Usuario criado
 */
router.post('/', autenticar, ctrl.criar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Usuario atualizado
 */
router.put('/:id', autenticar, ctrl.atualizar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Usuario removido
 */
router.delete('/:id', autenticar, ctrl.remover);

module.exports = router;
