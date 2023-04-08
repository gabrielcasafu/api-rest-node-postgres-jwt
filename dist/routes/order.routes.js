"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
const router = (0, express_1.Router)();
router.get('/orders', authJwt_1.default, (req, res) => {
    res.send({
        message: 'orders create'
    });
});
exports.default = router;
