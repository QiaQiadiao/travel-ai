<template>
  <div class="box">
    <IntroTop></IntroTop>
    <DefaultQuesitons></DefaultQuesitons>
  </div>
</template>

<script setup lang="ts">
import DefaultQuesitons from './cmps/DefaultQuesitons.vue';
import IntroTop from './cmps/IntroTop.vue';
</script>

<style scoped lang="less">
.box {
  // border: 1px solid black;
  width: 100%;
  height: 100px;
}
</style>
