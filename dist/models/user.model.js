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
const database_1 = __importDefault(require("../database"));
class UserModel {
    //Create new user
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Open connection with db
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) returning id,email,user_name,first_name,last_name`;
                //Run query that create user
                const result = yield connection.query(sql, [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    u.password,
                ]);
                //Release connection
                connection.release();
                //return create user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create user ${u.user_name} for error : ${error}`);
            }
        });
    }
    //Get All user
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, email,user_name,first_name,last_name from users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Unable to get users for error : ${error}`);
            }
        });
    }
    //get user
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT id, email,user_name,first_name,last_name FROM users WHERE id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    //update user
    updateUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `UPDATE users
       SET email=$1,user_name=$2,first_name=$3,last_name=$4,password=$5 WHERE id=$6
       RETURNING id,email,user_name,first_name,last_name`;
                const result = yield connection.query(sql, [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    u.password,
                    u.id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    //delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING id,email,user_name,first_name,last_name';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.default = UserModel;
