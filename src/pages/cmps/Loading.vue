<template>
  <div class="load-box">
    <img src="../../assets/slap.png" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.load-box {
  display: inline-block;
  // justify-content: center;
  width: 10px;
  height: 4px;
  position: relative;
  img {
    position: absolute;
    top: -3px;
    width: 10px;
    height: 10px;
    animation: slap 1s linear infinite;
  }
}
@keyframes slap {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
