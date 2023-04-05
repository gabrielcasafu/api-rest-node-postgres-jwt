"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
//schema
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name user
 *        lastname:
 *          type: string
 *          description: the lastname user
 *        email:
 *          type: string
 *          description: the email user
 *        password:
 *          type: string
 *          description: the password user
 *        codigosector:
 *          type: smallint
 *          description: the code sector user
 *        isactive:
 *          type: boolean
 *          description: isactive user
 *        createdat:
 *          type: date
 *          description: createdat
 *      required:
 *          - name
 *          - lastname
 *          - email
 *          - password
 *          - codigosector
 *          - isactive
 *          - createdat
 *      example:
 *          name: John
 *          lastname: Deep
 *          email: johndeep@email.com
 *          password: 123456
 *          codigosector: 5
 *          isactive: true
 *          createdat: 2023/04/01 18:47:00.59
 *    UserNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found user
 *      example:
 *        msg: Internal Server error
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: The user id
 */
/**
 * @swagger
 * tags:
 *  name: Users
 */
/**
* @swagger
* /api/v1/users:
*  get:
*    summary: List all user
*    tags: [Users]
*    responses:
*         200:
*           description: Ok.
*           content:
*             application/json:
*                schema:
*                  type: array
*                  items:
*                    $ref: '#/components/schemas/User'
*         500:
*           description: Server not found
 */
router.get('/users', users_controller_1.getUsers);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Get a user by Id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: Ok.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
router.get('/users/:id', users_controller_1.getUserById);
/**
* @swagger
* /api/v1/users:
*  post:
*    summary: Create user
*    tags: [Users]
*    requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*    responses:
*         200:
*           description: Ok.
*           content:
*             application/json:
*                schema:
*                  type: array
*                  items:
*                    $ref: '#/components/schemas/User'
*         500:
*           description: Server not found.
 */
router.post('/users', users_controller_1.createUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    summary: Update a user by id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Usuario actualizado.
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.put('/users/:id', users_controller_1.updateUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    summary: Delete a user by Id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: Ok.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
router.delete('/users/:id', users_controller_1.deleteUser);
exports.default = router;
