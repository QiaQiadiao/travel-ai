const logger = require('@/loggerMiddleware') // 日志
// 捕获错误中间件
const errorHandler = async(ctx, next) => {
    try {
        await next()
        logger.info(`输出日志：${ctx.method} ${ctx.url}`)
    } catch(err) {
        logger.error('错误', err.message)
        console.log(err)
        const error = err.message || '异常错误，请查看服务器端日志'
        const status = err.status || err.statusCode || 500
        ctx.send(null,status,"服务端异常错误",error)
    }
}

module.exports = errorHandler