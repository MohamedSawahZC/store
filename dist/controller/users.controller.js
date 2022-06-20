"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = exports.get = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default();
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        message: 'Hello, How are u babe',
    });
});
exports.get = get;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.create(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, user),
            message: 'user created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getMany();
        res.json({
            status: 'success',
            data: users,
            message: 'user retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMany = getMany;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'user retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.updateUser(req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'user updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.deleteUser(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'user deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOne = deleteOne;
