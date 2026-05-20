// Rotas de Pedidos com documentacao Swagger - [Pedro Mota Batista]
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/pedidoController');
const { autenticar } = require('../middleware/auth');

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', autenticar, ctrl.listar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Pedido encontrado
 */
router.get('/:id', autenticar, ctrl.buscar);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clienteId, itens]
 *             properties:
 *               clienteId: { type: string }
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId: { type: string }
 *                     quantidade: { type: integer }
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', autenticar, ctrl.criar);

/**
 * @swagger
 * /api/pedidos/{id}/status:
 *   put:
 *     summary: Atualiza status do pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendente, preparando, saiu_para_entrega, entregue, cancelado]
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.put('/:id/status', autenticar, ctrl.atualizarStatus);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Remove pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Pedido removido
 */
router.delete('/:id', autenticar, ctrl.remover);

module.exports = router;
