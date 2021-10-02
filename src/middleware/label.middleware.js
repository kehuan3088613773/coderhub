const service = require('../service/label.service')

  //判断标签是否存在
const verifyLabelExist = async(ctx, next) => {

  //1.取出要添加的所有标签
  const { labels } = ctx.request.body

  //2.判断每一个标签在label中是否存在
  const newLabels = []

  for (let name of labels) {

    //查询是否存在 不存在则返回空 
    const labelResult = await service.getLabelByName(name)
    const label = { name } //对象增强写法
    if( !labelResult ) {
      //不存在 创建标签数据
      const result = await service.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }

  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExist
}