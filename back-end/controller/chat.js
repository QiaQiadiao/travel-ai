const { error } = require("@/loggerMiddleware");
const OpenAI = require("openai");
const tools = require("@/tools/tools");
const callLocalFuc = require("@/tools/toolFunc");

class CharController {
  async ChatStream(ctx) {
    let { messages, model = "qwen-plus" } = ctx.request.body;

    if (!Array.isArray(messages)) {
      ctx.status = 400;
      ctx.body = { error: "messages 必须是数组" };
      return;
    }

    // 检查是否已有 system message，没有则添加
    const hasSystemMessage = messages.some((msg) => msg.role === "system");
    if (!hasSystemMessage) {
      messages.unshift({
        role: "system",
        content:
          "你是一个专业的广州旅游助手。你可以通过 search_knowledge_base 工具搜索广州的旅游攻略、景点介绍、美食推荐等本地知识。在回答用户关于广州旅游的问题时，请优先搜索知识库。你的回答应该亲切且具有广州特色。",
      });
    }

    const baseURL =
      model === "deepseek-chat"
        ? "https://api.deepseek.com"
        : "https://dashscope.aliyuncs.com/compatible-mode/v1";
    const apiKey =
      model === "deepseek-chat"
        ? process.env.DeepSeek_API_KEY
        : process.env.DASHSCOPE_API_KEY;

    const openai = new OpenAI({
      apiKey,
      baseURL,
    });

    ctx.status = 200;
    ctx.respond = false; // 禁用自动响应
    // 设置流式响应头 SSE协议
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      messages,
      // model: "deepseek-chat",
      // model: 'qwen-plus',
      model,
      tools,
      stream: true,
    });

    let toolCalls = []; // 收集 tool_calls

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      const finish = chunk.choices[0]?.finish_reason;

      if (delta?.content) {
        const txt = delta?.content;
        ctx.res.write(JSON.stringify({ type: "text", payload: txt }) + "\n");
      }

      // 工具调用增量
      if (delta?.tool_calls) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index;
          if (!toolCalls[idx])
            toolCalls[idx] = {
              id: "",
              type: "function",
              function: { name: "", arguments: "" },
            };
          if (tc.id) toolCalls[idx].id = tc.id;
          if (tc.function?.name)
            toolCalls[idx].function.name = tc.function.name;
          if (tc.function?.arguments)
            toolCalls[idx].function.arguments += tc.function.arguments;
        }
      }

      // 结束块
      if (finish === "tool_calls") {
        // 关闭 SSE，先让前端知道“我要调用函数了”
        // ctx.res.end();
        break;
      }
      if (finish === "stop") {
        // 正常结束，没有再调用函数
        ctx.res.end();
        return;
      }
    }
    // 如果收集到了工具函数
    if (toolCalls.length > 0) {
      // 本地调用工具函数
      const toolsResults = await Promise.all(
        toolCalls.map(async (call) => {
          const res = await callLocalFuc(
            call.function.name,
            JSON.parse(call.function.arguments),
          );
          return {
            type: call.function.name,
            content: res,
          };
        }),
      );

      // 先检查是否出错
      const firstResult = toolsResults[0].content;

      if (firstResult && firstResult._error) {
        // 直接向前端推送错误提示
        ctx.res.write(
          JSON.stringify({ type: "error", payload: firstResult._error }) + "\n",
        );
        ctx.res.end();
        return;
      }

      // 返回工具函数执行结果
      ctx.res.write(
        JSON.stringify({ type: "data", payload: toolsResults }) + "\n",
      );

      // 提示语
      const summary =
        toolsResults[toolsResults.length - 1].type === "query_train_tickets"
          ? `已为您查到 ${toolsResults[toolsResults.length - 1].content.length} 条班次(最多显示30条)。更多消息请到相关官网查询。总结这句话发给我`
          : `已经为您查到最近${toolsResults[toolsResults.length - 1].content.length}天的天气状况。更多消息请到相关官网查询。总结这句话发给我`;

      const newMessages = [
        ...messages,
        {
          role: "system",
          content: "返回工具函数，请调用工具函数，把结果告诉我，我帮你总结",
        }, // 不含 tool_calls
        { role: "user", content: `工具返回：${summary}` },
      ];

      // 二次请求
      const secondStream = await openai.chat.completions.create({
        messages: newMessages,
        // model: 'deepseek-chat',
        // model: 'qwen-plus',
        model,
        stream: true,
      });

      // 返回前端
      for await (const chunk of secondStream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          ctx.res.write(
            JSON.stringify({ type: "text", payload: delta }) + "\n",
          );
        }
      }

      ctx.res.end(); // 关闭连接
    }
  }

  // async chat(ctx) {
  //     const { prompt } = ctx.request.body || {};
  //     if (!prompt) {
  //         ctx.status = 400;
  //         ctx.body = {
  //             error: 'prompt必填'
  //         };
  //         return;
  //     }

  //     try {
  //         const result = await openai.chat.completions.create({
  //             model: 'deepseek-chat',
  //             messages: [
  //                 { role: 'system', content: '你是小粤，一个广州旅行助手，只能够以简洁、高效的方式解答用户关于广州的问题，其他无关问题一概不予回答' },
  //                 { role: 'user', content: prompt }
  //             ]
  //         });

  //         const reply = result.choices?.[0]?.message?.content || '';
  //         ctx.body = reply;
  //     } catch (e) {
  //         ctx.status = 500;
  //         ctx.body = 'Error: ' + e.message;
  //     }
  // }
}
module.exports = new CharController();
