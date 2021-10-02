const connection = require('../app/database')

class labelService {
  async create(name){
    const statement = `INSERT INTO label (name) VALUES (?);`

    const [result] = await connection.execute(statement, [name])
    console.log(result);
    return result 
  }

  async getLabelByName(name){
    const statement = `SELECT * FROM label WHERE name = ? ;`

    const [result] = await connection.execute(statement, [name])
    //result返回的是一个数组，如果是undefined，则不存在，否则则证明查到，就是存在
    return result[0]
  }

  async getLabels(limit, offset){
    const statement = `SELECT * FROM label LIMIT ?, ?;`

    const [result] = await connection.execute(statement, [offset, limit])

    return result
  }
}

module.exports = new labelService()