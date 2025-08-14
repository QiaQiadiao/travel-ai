  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import { postAIReply } from '../apis'
  import { v4 as uuidv4 } from 'uuid';

  export const useUserContentStore = defineStore('user', () => {
    const messages = ref([
      {  role: 'system', content: '你是小粤，一个广州旅行助手，只能够以简洁、高效的方式解答用户关于广州的问题，也可以查询中国大陆内天气和火车票，其他无关问题一概不予回答。另外，只关注当前问题，忽略无关的历史对话,不能重复已经回答过的问题。', done: true },
    ])
    const queryData = ref([
      // { id: uuidv4(), type: 'get_weather', content: '...'},
      // { id: uuidv4(), type: 'query_train_tickets', content: '...'}
      // { id: uuidv4(), type: 'error', content: '...'}
    ])
    const currentDelta = ref('') // 当前加载的文本信息
    const streamingId = ref(null) // 当前信息流的id
    const model = ref('qwen-plus') // 模型
    const pendingChunk = ref('')      // 缓存区：等待这一次 rAF 写入的内容
    let rafId = null   // 记录 requestAnimationFrame id，方便取消
    async function getRes(content) {
      if(content) {
        // 1. 先添加空壳 ai 消息 和 用户消息
        const newChat = { id:uuidv4(), role: 'system', content: '', done: false }
        const userChat = { id:uuidv4(), role: 'user', content, done: true}
        streamingId.value = newChat.id
        currentDelta.value = ''
        messages.value.push(userChat)
        messages.value.push(newChat)

        // 2. 调用接口，请求后端
        const onChunkFn = (chunk) => {
          pendingChunk.value += chunk     // 1. 先把 chunk 放进缓存区

          if (rafId !== null) return      // 2. 如果已经预定了一帧，直接退出

          rafId = requestAnimationFrame(() => {
            currentDelta.value += pendingChunk.value // 3. 在下一帧一次性写入
            pendingChunk.value = ''       // 4. 清空缓存区
            rafId = null                  // 5. 重置标记，允许下一批 chunk 再次预定
          })
        }

        const onDataFn = (data) => {      
          const d = data[data.length-1]  
          queryData.value.push({id: streamingId.value, type: d.type, content: d.content}) 
        }

        const onErrorFn = (data) => {
          currentDelta.value = data
          queryData.value.push({id: streamingId.value, type: 'error', content: data}) 
        }

        let tempMsgs = messages.value.map(({ id, role, content }) => ({ id, role, content }));

        // 1. 去掉最后一条
        tempMsgs.pop();

        // 2. 给新的最后一条追加提示
        if (tempMsgs.length) {
          tempMsgs[tempMsgs.length - 1].content += '（不要重复回答已经回答过的问题！只需要回答这个问题！）';
        }

        // 3. 收集要删除的索引（命中 id 及其上一条）
        const queryDataIds = new Set(queryData.value.map(item => item.id));
        const toDelete = new Set();

        for (let i = 0; i < tempMsgs.length; i++) {
          if (queryDataIds.has(tempMsgs[i].id)) {
            toDelete.add(i);
            if (i > 0) toDelete.add(i - 1);
          }
        }

        // 4. 倒序批量删除，避免索引错位
        tempMsgs = tempMsgs.filter((_, idx) => !toDelete.has(idx));

        // 5. 去掉 id
        tempMsgs = tempMsgs.map(({ role, content }) => ({ role, content }));
        
        await postAIReply(tempMsgs, model.value, onChunkFn, onDataFn, onErrorFn)
        
        // 3. 整合完整消息
        const targetId = messages.value.findIndex((item)=>item.id === streamingId.value)
        if(targetId !== -1) {
          let target = messages.value[targetId]
          target.content += currentDelta.value
          target.done = true
          currentDelta.value = ''
          streamingId.value = null
        }
        // console.log('查询列表:')
        // console.log(queryData.value);
        
        // console.log('消息列表：');
        // console.log(messages.value);
        
      }
    }

    return { messages, queryData, currentDelta, getRes, streamingId, model }
  })
