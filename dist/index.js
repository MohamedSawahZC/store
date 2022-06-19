"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.get('/', (req, res) => {
    res.send({
        message: 'Welcome dude',
    });
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is working successfully in ${PORT}`);
});
exports.default = server;
