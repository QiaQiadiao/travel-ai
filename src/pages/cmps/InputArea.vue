<template>
  <div class="input-box">
    <div class="data-query">
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-uploader>
        <van-button type="primary">上传文件</van-button>
      </van-uploader>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.input-box {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
