import User from '../types/user.type';
import database from '../database';
class UserModel {
  //Create new user
  async create(u: User): Promise<User> {
    try {
      //Open connection with db
      const connection = await database.connect();
      const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) returning *`;
      //Run query that create user
      const result = await connection.query(sql, [
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
    } catch (error) {
      throw new Error(
        `Unable to create user ${u.user_name} for error : ${error}`
      );
    }
  }
  //Get All user
  //get user
  //update user
  //delete user
  //auth user
}

export default UserModel;
