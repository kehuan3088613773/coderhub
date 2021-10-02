const connectios = require('../app/database')

class FileService {

  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connectios.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getAvatarByUserId(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connectios.execute(statement, [userId])
    return result[0]//查询到的是一条数据
  }

  async createFile(filename, mimetype, size, userId, momentId){
    
    const statement = `
      INSERT INTO file (filename, mimetype, size, user_id, moment_id)
      VALUES (?, ?, ?, ?, ?);
    `
    const [result] = await connectios.execute(statement, [filename, mimetype, size, userId, momentId])
    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connectios.execute(statement, [filename])
    return result[0]//查询到的是一条数据    
  }
}

module.exports = new FileService()