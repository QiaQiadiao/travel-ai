<template>
  <div class="noticement">
    <h1>已成功提交！</h1>
    <h3>谢谢您的反馈！我们会尽快处理！</h3>
    <button @click="getBackToMain">返回</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const getBackToMain = () => {
  router.push('/');
};
</script>

<style scoped lang="less">
.noticement {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  line-height: 20px;
  font-size: 8px;
  button {
    // height: 15px;
    width: 30px;
    border-radius: 10px;
    border: none;
    background-color: #fff;
    margin-top: 50px;
  }
}
</style>
