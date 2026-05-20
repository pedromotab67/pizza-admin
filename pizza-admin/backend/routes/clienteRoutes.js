// Rotas de Clientes com documentacao Swagger - [Pedro Mota Batista]
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/clienteController');
const { autenticar } = require('../middleware/auth');

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', autenticar, ctrl.listar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Busca cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente nao encontrado
 */
router.get('/:id', autenticar, ctrl.buscar);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Cria novo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, telefone, cep]
 *             properties:
 *               nome: { type: string }
 *               telefone: { type: string }
 *               cep: { type: string }
 *               logradouro: { type: string }
 *               numero: { type: string }
 *               bairro: { type: string }
 *               cidade: { type: string }
 *               estado: { type: string }
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post('/', autenticar, ctrl.criar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Atualiza cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cliente atualizado
 */
router.put('/:id', autenticar, ctrl.atualizar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Remove cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cliente removido
 */
router.delete('/:id', autenticar, ctrl.remover);

module.exports = router;
