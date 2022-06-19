"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = require("express-rate-limit");
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('common')); // Logger middleware to show any request happent in server
server.use((0, helmet_1.default)()); //For HTTP Security
server.use(express_1.default.json()); //For parsing json bodies
//================= handle rate limit for security from spam bots =====================
server.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP, please try again after an hour', // Disable the `X-RateLimit-*` headers
}));
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
