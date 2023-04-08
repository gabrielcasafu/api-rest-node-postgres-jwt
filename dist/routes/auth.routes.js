"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, Content-Type, Accept");
    next();
});
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
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: the name user
 *        password:
 *          type: string
 *          description: the password user
 *      required:
 *          - username
 *          - password
 *      example:
 *          username: johndeep@email.com
 *          password: $2b$10$m4hzNB7PdDdGgfn2379cZ.A6sZHKRGgh5UDCAimfdL1DIS2KmWoFK
 *    ServerNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found server
 *      example:
 *        message: Internal Server error
 */
/**
 * @swagger
 * tags:
 *  name: Auth
 */
/**
* @swagger
* /api/v1/auth/register:
*  post:
*    summary: Create user
*    tags: [Auth]
*    requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
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
*           description: Server not found.
*/
router.post('/auth/register', auth_controller_1.registerUser);
/**
* @swagger
* /api/v1/auth/login:
*  post:
*    summary: login user
*    tags: [Auth]
*    requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Login'
*    responses:
*         200:
*           description: Ok
*           content:
*             application/json:
*                schema:
*                  type: array
*                  items:
*                    $ref: '#/components/schemas/Login'
*         500:
*           description: Server not found.
*/
router.post('/auth/login', auth_controller_1.loginUser);
exports.default = router;
