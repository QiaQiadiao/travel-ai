import { marked } from 'marked';
import DOMPurify from 'dompurify';
// ai对话接口
export async function postAIReply(messages,model,onChunk,onData,onError) {
  const response = await fetch('http://192.168.31.33:7000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages, model })
  })
  if (!response.ok) {
    console.error('请求失败');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer = decoder.decode(value, { stream: true });
    let lines = buffer.split('\n');
    buffer = lines.pop() ?? '' // 最后一行可能显示不完整

    for (const ln of lines) {
      if (!ln.trim()) continue;
      
      try {
        const { type, payload } = JSON.parse(ln);
        if (type === 'data') onData(payload);   // 数据信息
        if (type === 'text') onChunk(payload);   // 逐字文字
        if (type === 'error') onError(payload); // 服务端错误
      } catch(e) { 
        /* 忽略解析失败的片段 */ 
        console.log('流数据解析失败:')
        console.log(e)
        throw new Error('流数据解析失败')
      }

    }
    
  }

}

/**
 * MD 渲染函数
 * @param {*} md markdown格式文本
 * @returns 
 */
export const mdToHtml = (md) =>
  DOMPurify.sanitize(marked.parseInline(md));

// 上下文问题相关性打分
// export async function quickLLM(currentQuestion, messages) {
//   const judgePrompt = `
//     对话历史（最后 2 轮）：
//     ${messages.map(h=>`${h.role}: ${h.content}`).join('\n')}

//     用户新问题：
//     ${currentQuestion}

//     请判断新问题是否需要引用上述历史才能回答。只需输出 1（需要）或 0（不需要）。
//     `;
//   const msg = [
//     {"role":"system","content":judgePrompt},
//   ]

//   const response = await fetch('http://192.168.31.33:7000/chat', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ messages: msg })
//   })

//   if (!response.ok) {
//     console.error('请求失败');
//     return;
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder('utf-8');
//   let partial = '';

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     const chunk = decoder.decode(value, { stream: true });
//     partial += chunk;
//   }
//   console.log(partial);
  
//   return Number(partial)
// }