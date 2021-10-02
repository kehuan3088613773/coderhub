const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5passwored = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

//验证登录
const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body

  //2.判断用户名和密码是否为空
  if (!name || !password){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return  ctx.app.emit('error',error, ctx)
  }

  //3.判断用户是否存在（用户不存在）
  const result = await userService.getUserByName(name)
  const user = result[0]
  console.log(user);
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  //4.判断密码是否和数据库中的密码是否一致（加密）
  if(md5passwored(password) !== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}


//验证授权
const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware');

  //1.获取token
  const authorization = ctx.headers.authorization;

  if(!authorization) {
    const error = new Error(errorTypes.UNUNTHRIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')//替换掉不需要的
  
  //2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]//解密算法
    })
    ctx.user = result
    console.log(ctx.user,123);
    console.log('成功授权');
    
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNUNTHRIZATION)
    ctx.app.emit('error', error, ctx)
  }


}


// //验证是否有修改的权限
// //采用闭包的方式
// const verifyPermission = (tableName) => {
//   return async(ctx, next) => {

//     //1.获取参数
//     const { momentId } = ctx.params
//     const { id } = ctx.user
  
//     //2.查询是否具备权限
//     try {
//       const isPermission = await authService.checkResource(tableName, momentId, id)
      
//       if(!isPermission) throw new Error() //没有权限就抛出异常
//       await next()
//     } catch (err) {
//       const error = new Error(errorTypes.UNPERMISSION)
//       return ctx.app.emit('error', error, ctx)    
  
//     }  
//   }

//验证是否有修改的权限
const verifyPermission = async(ctx, next) => {

    //1.获取参数 
    // console.log(ctx.params); { commentId: '1' }
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id', '')
    const  resourceId = ctx.params[resourceKey]
    // const { momentId } = ctx.params
    const { id } = ctx.user
  
    //2.查询是否具备权限
    try {
      const isPermission = await authService.checkResource(tableName, resourceId, id)
      if(!isPermission) throw new Error() //没有权限就抛出异常
      await next()
    } catch (err) {
      const error = new Error(errorTypes.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)    
  
    }  


}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
