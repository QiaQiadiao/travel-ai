<template>
  <van-nav-bar title="投诉" left-arrow @click-left="onClickLeft" fixed="true" />
  <div class="box"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  height: 20px;
  .van-nav-bar__title {
    font-size: 10px !important;
  }
  .van-nav-bar__left {
    color: red;
  }
}
</style>
