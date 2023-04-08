"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
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
 *          password: $2b$10$m4hzNB7PdDdGgfn2379cZ.A6sZHKRGgh5UDCAimfdL1DIS2KmWoFK
 *          codigosector: 5
 *          isactive: true
 *          createdat: 2023/04/01 18:47:00.59
 *    ServerNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found server
 *      example:
 *        message: Internal Server error
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: User id
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
*           description: Ok
*           content:
*             application/json:
*                schema:
*                  type: array
*                  items:
*                    $ref: '#/components/schemas/User'
*         500:
*           description: Server not found
 */
router.get('/users', authJwt_1.default, users_controller_1.getUsers);
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
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: server not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServerNotFound'
 */
router.get('/users/:id', users_controller_1.getUserById);
// /**
// * @swagger
// * /api/v1/users:
// *  post:
// *    summary: Create user
// *    tags: [Users]
// *    requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/components/schemas/User'       
// *    responses:
// *         200:
// *           description: Ok
// *           content:
// *             application/json:
// *                schema:
// *                  type: array
// *                  items: 
// *                    $ref: '#/components/schemas/User'
// *         500:
// *           description: Server not found.
//  */
// router.post('/users', createUser);
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
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      500:
 *        description: the server not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServerNotFound'
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
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: the server not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServerNotFound'
 */
router.delete('/users/:id', users_controller_1.deleteUser);
exports.default = router;
