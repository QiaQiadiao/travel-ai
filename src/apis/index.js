import { marked } from 'marked';
import DOMPurify from 'dompurify';
// ai对话接口
export async function postAIReply(messages,onChunk) {
  const response = await fetch('http://localhost:7000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  })
  if (!response.ok) {
    console.error('请求失败');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let partial = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    partial += chunk;

    // 实时显示内容（如在页面中追加）
    console.log(chunk);
    onChunk(chunk)
  }

  console.log(`流式传输完成: ${partial}`);

}
// MD 渲染函数
export const mdToHtml = (md) =>
  DOMPurify.sanitize(marked.parseInline(md, { breaks: true }));