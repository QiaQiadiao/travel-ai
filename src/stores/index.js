import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { fetchAIReply } from '../apis'
export const useUserContentStore = defineStore('user', () => {
  const prompts = reactive({
    prompt1: null,
    prompt2: '123123'
  })
    
  async function getRes(prompt) {
    if(prompt) {
        prompts[prompt] = null
        const res = await fetchAIReply(prompt)
        // let ans = ''
        // let timer = setInterval(() => {

        //   ans += res.slice(pos,len)

        // }, 50);
        prompts[prompt] = res
    }
  }

  return { prompts, getRes}
})
