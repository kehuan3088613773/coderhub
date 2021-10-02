const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')
const {
  saveAvatarInfo,      
  savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})
 


//头像上传
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

//图片上传
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo)

module.exports = fileRouter

