import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserContentStore = defineStore('user', () => {
  const prompts = ref(['prompt1','prompt2','prompt3'])
  function add(prompt) {
    if(prompt) {
        prompts.value.push(prompt)
    }
  }
  function clearAll() {
    prompts.value.length = 0
  }
  return { prompts, add, clearAll }
})