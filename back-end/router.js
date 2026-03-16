const Router = require("@koa/router")
const router = new Router()
// 用户相关的
const user = require('@/controller/user')
// ai
const chat = require('@/controller/chat')
// 登录接口
router.post('/wxlogin', user.wxLogin)
// ai接口
router.post('/chat',chat.ChatStream)

module.exports = router