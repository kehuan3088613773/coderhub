const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller.js')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  verifyLabelExist
} = require('../middleware/label.middleware')

momentRouter.post('/',verifyAuth, create)//创建动态
momentRouter.get('/', list)//查询全部动态
momentRouter.get('/:momentId', detail)//查询单条动态

//1.用户必须登录
//2.用户拥有权限
momentRouter.patch('/:momentId', verifyAuth , verifyPermission, update)//修改内容

//删除内容
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

//给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels)


//动态配图
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter