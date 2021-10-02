const connection = require('../app/database')

class AuthService {

  //检查动态是否具有这个权限
  // async checkMoment(momentId, userId){
  //   const statment = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
  //   const [result] =  await connection.execute(statment, [momentId, userId])
        
  //   //查询到为空的话 就证明不具备权限
  //   return result.length === 0 ? false : true
  // }

  //检查动态是否具有这个权限
  async checkResource(tableName, id, userId){
    const statment = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] =  await connection.execute(statment, [id, userId])
        
    //查询到为空的话 就证明不具备权限
    return result.length === 0 ? false : true
  }
}

module.exports = new AuthService()