<template>
  <div class="boxDQ">
    <div class="ai">
      <img src="../../assets/girl.png" alt="" />
      <div class="text">小粤</div>
    </div>
    <div class="questions">
      <span id="head">你可以这样问我</span>

      <template v-for="question in defaultQuestions" :key="question">
        <div class="q" @click="handleAskDQ(question)">
          <img src="../../assets/dialog.png" alt="" />
          <span>{{ question }}</span>
        </div>
      </template>
    </div>
    <div class="btn">
      <img src="../../assets/change.png" alt="" />
      <span>换一批</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useUserContentStore } from '@/stores/index';

const defaultQuestions = ref([
  '广州有什么旅游景点',
  '广州有什么好吃的',
  '广州有什么好玩的',
  '广州有什么好逛的',
]);
const emit = defineEmits(['send-dq']);
const userContentStore = useUserContentStore();
const handleAskDQ = (question) => {
  userContentStore.add(question);
  emit('send-dq');
};
</script>

<style scoped lang="less">
@font-face {
  font-family: 'AlimamaDaoLiTi';
  src:
    url('../../../src/fonts/AlimamaDaoLiTi.woff2') format('woff2'),
    url('../../../src/fonts/AlimamaDaoLiTi.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
.boxDQ {
  width: 80%;
  margin-top: 8px;
  height: 140px;
  .ai {
    display: flex;
    align-items: center;
    margin-left: 8px;
    img {
      width: 12px;
    }
    .text {
      font-size: 8px;
      font-weight: normal;
      font-family: 'AlimamaDaoLiTi', sans-serif;
    }
  }
  .questions {
    width: 90%;
    padding-bottom: 5px;
    margin: 0 auto;
    background-color: white;
    border-radius: 5px;
    #head {
      display: inline-block;
      font-size: 6px;
      margin-left: 5px;
      margin-top: 3px;
    }
    .q {
      display: flex;
      align-items: center;
      width: 95%;
      height: 16px;
      margin: 5px auto;
      background: #fff1f4;
      border-radius: 5px;
      img {
        height: 6px;
        margin: 5px;
      }
      span {
        font-size: 6px;
        margin-bottom: 1px;
        margin-left: 2px;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12px;
    width: 35px;
    margin-left: 8px;
    margin-top: 3px;
    background-color: white;
    border-radius: 5px;
    img {
      height: 50%;
      margin-right: 3px;
    }
    span {
      font-size: 6px;
      margin-bottom: 1px;
    }
  }
}
</style>
