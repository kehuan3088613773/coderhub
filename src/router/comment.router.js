const Router = require('koa-router')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')
const commentRouter = new Router({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
//回复
commentRouter.post('/:commentId/reply', verifyAuth, reply)

//修改
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
// commentRouter.patch('/:commentId', verifyAuth, verifyPermission("tag"), update)

//删除
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)

//获取评论列表
commentRouter.get('/', list)
module.exports = commentRouter