<template>
  <div class="box" ref="boxRef" @scroll="onScroll">
    <IntroTop></IntroTop>
    <DefaultQuesitons @send-dq="handleSendDQ"></DefaultQuesitons>
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
// 自动跟随文本增加
const boxRef = ref();
const autoScroll = ref(false);
function handleMsgChange(isChange) {
  if (isChange && autoScroll.value) {
    // boxRef.value.scrollTop = boxRef.value.scrollHeight;
    boxRef.value.scrollTo({
      top: boxRef.value.scrollHeight, // 显示页面的顶部划到
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
const handleSendPrompts = async (IsPromptsExit) => {
  if (IsPromptsExit) {
    // 如果用户输入信息
    await nextTick();
    setTimeout(() => {
      // 延迟个0.1s来防止手机端的延迟
      requestAnimationFrame(() => {
        //移动端处理动画方式
        if (boxRef.value) {
          boxRef.value.scrollTop = boxRef.value.scrollHeight; // 屏幕滑到底部
        }
      });
    }, 100);
  }
};
// 处理用户发送默认问题
const handleSendDQ = async () => {
  await nextTick();
  requestAnimationFrame(() => {
    //移动端处理动画方式
    if (boxRef.value) {
      boxRef.value.scrollTop = boxRef.value.scrollHeight; // 屏幕滑到底部
    }
  });
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  // 自动跟随
  height: 100vh;
  overflow-y: auto; // 让它可以滚动
  scroll-behavior: smooth; // 有些浏览器支持这句，但建议配合 js 使用
}
</style>
