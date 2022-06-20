import User from '../types/user.type';
import database from '../database';
import config from '../config';
import bcrypt, { hashSync } from 'bcrypt';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt_round as string, 10);
  return bcrypt.hashSync(`${password}${config.secret_key}`, salt);
};

class UserModel {
  //Create new user
  async create(u: User): Promise<User> {
    try {
      //Open connection with db
      const connection = await database.connect();
      const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) returning id,email,user_name,first_name,last_name`;
      //Run query that create user
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
      ]);
      //Release connection
      connection.release();
      //return create user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create user ${u.user_name} for error : ${error}`
      );
    }
  }
  //Get All user

  async getMany(): Promise<User[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT id, email,user_name,first_name,last_name from users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get users for error : ${error}`);
    }
  }

  //get user

  async getOne(id: string): Promise<User> {
    try {
      const connection = await database.connect();
      const sql = `SELECT id, email,user_name,first_name,last_name FROM users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  //update user
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE users
       SET email=$1,user_name=$2,first_name=$3,last_name=$4,password=$5 WHERE id=$6
       RETURNING id,email,user_name,first_name,last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  //delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const connection = await database.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id,email,user_name,first_name,last_name';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  //auth user
}

export default UserModel;
