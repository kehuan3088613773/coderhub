const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    //获取用户请求传递的参数
    const user = ctx.request.body
    
    //查询数据库
    const result = await userService.create(user)

    //给用户返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next){
    //1.用户的头像是哪一个文件呢
    const { userId } = ctx.params

    //2.查询
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    //3.提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController();