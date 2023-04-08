"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/dashboard', (req, res) => {
    res.status(200).json({ message: 'Redirecting to the home page.' });
});
exports.default = router;
