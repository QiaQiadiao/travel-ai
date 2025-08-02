<template>
  <div class="box" ref="boxRef" @scroll="onScroll">
    <IntroTop></IntroTop>
    <DefaultQuesitons></DefaultQuesitons>
    <ChatMessage @dialog-change="handleMsgChange"></ChatMessage>
    <AutoScrollIcon
      v-if="!autoScroll"
      @click="handleAutoScroll"
    ></AutoScrollIcon>
    <InputArea @send-prompts="handleSendPrompts"></InputArea>
  </div>
</template>

<script setup lang="ts">
import DefaultQuesitons from './cmps/DefaultQuesitons.vue';
import AutoScrollIcon from './cmps/AutoScrollIcon.vue';
import IntroTop from './cmps/IntroTop.vue';
import ChatMessage from './cmps/ChatMessage.vue';
import InputArea from './cmps/InputArea.vue';
import { nextTick, ref } from 'vue';
import { useUserContentStore } from '@/stores/index';
// 自动跟随文本增加
const boxRef = ref();
const autoScroll = ref(false);
function handleMsgChange(isChange) {
  if (isChange && autoScroll.value) {
    boxRef.value.scrollTo({
      top: boxRef.value.scrollHeight,
      behavior: 'smooth', // ✨ 丝滑滚动
    });
  }
}
function handleAutoScroll() {
  autoScroll.value = !autoScroll.value;
  handleMsgChange(true);
}
function onScroll() {
  const el = boxRef.value;
  if (!el) return;

  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  if (distanceToBottom > 50) autoScroll.value = false;
  else autoScroll.value = true;
}
// 处理用户发送内容
const userContentStore = useUserContentStore();
const handleSendPrompts = async (IsPromptsExit) => {
  if (IsPromptsExit) {
    await nextTick();
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (boxRef.value) {
          boxRef.value.scrollTop = boxRef.value.scrollHeight;
        }
      });
    }, 1000);
  }
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  // 自动跟随
  max-height: 100%; // 加一个最大高度限制
  overflow-y: auto; // 让它可以滚动
  scroll-behavior: smooth; // 有些浏览器支持这句，但建议配合 js 使用
}
</style>
