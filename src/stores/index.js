  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import { postAIReply } from '../apis'
  import { v4 as uuidv4 } from 'uuid';

  export const useUserContentStore = defineStore('user', () => {
    const messages = ref([
      { id: uuidv4(), role: 'system', content: '你是小粤，一个广州旅行助手，只能够以简洁、高效的方式解答用户关于广州的问题，也可以查询中国大陆内天气和火车票，其他无关问题一概不予回答。另外，只关注当前问题，忽略无关的历史对话,不能重复已经回答过的问题。', done: true },
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
        const onChunkFn = (chunk) => {
          currentDelta.value += chunk
        }

        const onDataFn = (data) => {      
          const d = data[data.length-1]  
          queryData.value.push({id: streamingId.value, type: d.type, content: d.content}) 
          console.log(queryData.value)
        }

        // let tempMsgs = messages.value.map(({id, role, content})=>({id, role, content}))
        // tempMsgs.splice(tempMsgs.length-1,1)
        // tempMsgs[tempMsgs.length-1].content += '（不要重复回答已经回答过的问题！只需要回答这个问题！）' // 哈哈哈哈，我真是个机灵鬼！   
        
        // const queryDataIds = queryData.value.map(item=> item.id)
        // // tempMsgs = tempMsgs.filter((item)=>!queryDataIds.includes(item.id)).map(({role, content})=>({role, content}))
        // for(let i=0; i<tempMsgs.length; i++) {
        //   if(queryDataIds.includes(tempMsgs[i].id)) {
        //     tempMsgs.splice(i-1,2)
        //   }
        // }
        // tempMsgs = tempMsgs.map(({ role, content})=>({ role, content}))
        // console.log(tempMsgs)
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

        console.log(tempMsgs);
        
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

    return { messages, queryData, currentDelta, getRes, streamingId }
  })
