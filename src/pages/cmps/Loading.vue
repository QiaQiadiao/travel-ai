<template>
  <div class="load-box">
    <img src="../../assets/slap.png" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.load-box {
  display: flex;
  justify-content: center;
  width: 15px;
  height: 15px;
  img {
    width: 15px;
    height: 15px;
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
