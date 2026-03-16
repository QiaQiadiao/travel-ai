<template>
  <div class="icon">👇</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 8px;
}
</style>
