const connection = require('../app/database')

class UserService {
  async create(user){

    //拿到用户数据
    const { name, password } = user
    
    //将user存储到数据库中
    const statement = `INSERT INTO user (name, password) VALUES (?,?);`

    const result = await connection.execute(statement, [name, password])
    
    return result[0]
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE NAME = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
    //result 是个数组 里面放着两个数组
    //第一个数组里面放着很多个数组用户
    //第二个数组放着很多字段
    //我们只需要第一个数组
  }

  async updateAvatarUrlById(avatarUrl, userId){
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    
    return result 
  }
}

module.exports = new UserService()