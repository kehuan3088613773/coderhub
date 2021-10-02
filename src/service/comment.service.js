const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId){
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, userId])

    return result 
  }

  async reply(momentId, content, userId, commentId){
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId])

    return result 
  }

  async update(commentId, content){
    const statment = `UPDATE comment SET content = ? WHERE id = ? ;`
    const [result] = await connection.execute(statment, [content, commentId])

    return result
  }

  async remove(commentId){
    const statment = `DELETE FROM comment WHERE id = ? ;`
    const [result] = await connection.execute(statment, [commentId])
    return result
  }

  async getCommentsByMomentId(momentId){
    const statment = `
      SELECT 
        m.id, m.content, m.comment_id commentId, m.creatAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE m.moment_id = ? ;      
    `
    const [result] = await connection.execute(statment, [momentId])
    
    return result 
  }
}

module.exports = new CommentService()