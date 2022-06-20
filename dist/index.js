"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = require("express-rate-limit");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const index_1 = __importDefault(require("./routes/index"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('common')); // Logger middleware to show any request happent in server
server.use((0, helmet_1.default)()); //For HTTP Security
server.use(express_1.default.json()); //For parsing json bodies
database_1.default.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
    })
        .catch((error) => console.log(error));
});
server.use('/api', index_1.default);
server.use(error_middleware_1.default);
//================= handle rate limit for security from spam bots =====================
server.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP, please try again after an hour', // Disable the `X-RateLimit-*` headers
}));
//============ Handle route not found =============
server.use((_req, res) => {
    res.status(404).json({
        message: 'ooh you are lost maybe page not found',
    });
});
//=================================================
server.listen(config_1.default.port, () => {
    console.log(`Server is working successfully in ${config_1.default.port}`);
});
exports.default = server;
