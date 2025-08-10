import { defineStore } from 'pinia'
import { ref } from 'vue'
import { postAIReply } from '../apis'
import { v4 as uuidv4 } from 'uuid';

export const useUserContentStore = defineStore('user', () => {
  const messages = ref([
    { id: uuidv4(), role: 'system', content: '你是小粤，一个广州旅行助手，只能够以简洁、高效的方式解答用户关于广州的问题，其他无关问题一概不予回答。另外，只关注当前问题，忽略无关的历史对话,不能重复已经回答过的问题。', done: true },
  ])
  const queryData = ref([
    // { id: uuidv4(), type: 'weather', content: '...'},
    // { id: uuidv4(), type: 'train', content: '...'}
  ])
  const currentDelta = ref('') // 当前加载的文本信息
  const streamingId = ref(null) // 当前信息流的id

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
      const tempMsgs = messages.value.map(({role, content})=>({role, content}))
      const onChunkFn = (chunk) => {
        currentDelta.value += chunk
      }
      const onDataFn = (data) => {        
        data.forEach((d)=>{
          queryData.value.push({id: streamingId.value, type: d.type, content: d.content})
        })
        console.log(queryData.value)
      }
      tempMsgs.splice(tempMsgs.length-1,1)
      tempMsgs[tempMsgs.length-1].content += '（不要重复回答已经回答过的问题！）' // 哈哈哈哈，我真是个机灵鬼！   
      console.log(tempMsgs)
      await postAIReply(tempMsgs, onChunkFn, onDataFn)

      // 3. 整合完整消息
      const targetId = messages.value.findIndex((item)=>item.id === streamingId.value)
      if(targetId !== -1) {
        let target = messages.value[targetId]
        target.content += currentDelta.value
        target.done = true
        currentDelta.value = ''
        streamingId.value = null
        console.log(messages.value)
      }
    }
  }

  return { messages, queryData, currentDelta, getRes }
})
