export async function fetchAIReply(prompt) {
  const response = await fetch('http://localhost:7000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('请求失败');
  }

  const reply = await response.text(); // 直接获取文本内容
  console.log('AI 完整回复：', reply);
  return reply
}
