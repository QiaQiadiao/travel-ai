const Koa = require("koa");
const app = new Koa();
const json = require("koa-json"); // 将http响应数据转换为json格式
const bodyParser = require("koa-bodyparser"); // 解析http请求的消息体
const cors = require("@koa/cors"); // 跨域
const { addAliases } = require("module-alias");
addAliases({
  "@": __dirname,
});
// .env自动转换key valu 微型库 用于提取.env中的apiKey
require("dotenv").config(); // 第一行就加载

// 初始化 RAG 服务
const ragService = require("@/services/rag_service");
ragService
  .init()
  .then(() => {
    console.log("RAG Knowledge base initialized.");
  })
  .catch((err) => {
    console.error("Failed to initialize RAG:", err);
  });

// 接口
const router = require("@/router");
// 统一接口响应数据格式（中间件）
const responseHandler = require("@/config/result");
// 捕获错误中间件
const errorHandler = require("@/config/errorhandler");

app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(responseHandler);
app.use(errorHandler);

app.use(router.routes()).use(router.allowedMethods());
app.listen(7000);
console.log("7000端口已启动~");
