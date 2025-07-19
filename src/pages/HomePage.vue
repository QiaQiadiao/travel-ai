<template>
  <div class="box">
    <IntroTop></IntroTop>
    <DefaultQuesitons></DefaultQuesitons>
    <ChatMessage></ChatMessage>
    <InputArea></InputArea>
  </div>
</template>

<script setup lang="ts">
import DefaultQuesitons from './cmps/DefaultQuesitons.vue';
import IntroTop from './cmps/IntroTop.vue';
import ChatMessage from './cmps/ChatMessage.vue';
import InputArea from './cmps/InputArea.vue';
</script>

<style scoped lang="less">
.box {
  width: 100%;
}
</style>
