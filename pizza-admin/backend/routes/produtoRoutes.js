// Rotas de Produtos com documentacao Swagger - [Pedro Mota Batista]
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/produtoController');
const { autenticar } = require('../middleware/auth');

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos (filtro opcional por categoria)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *           enum: [pizza, bebida, sobremesa]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', autenticar, ctrl.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Produto encontrado
 */
router.get('/:id', autenticar, ctrl.buscar);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco, categoria]
 *             properties:
 *               nome: { type: string }
 *               descricao: { type: string }
 *               preco: { type: number }
 *               categoria:
 *                 type: string
 *                 enum: [pizza, bebida, sobremesa]
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/', autenticar, ctrl.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Produto atualizado
 */
router.put('/:id', autenticar, ctrl.atualizar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Produto removido
 */
router.delete('/:id', autenticar, ctrl.remover);

module.exports = router;
