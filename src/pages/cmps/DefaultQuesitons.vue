<template>
  <div class="boxDQ">
    <div class="ai">
      <img src="../../assets/girl.png" alt="" />
      <div class="text">小粤</div>
    </div>
    <div class="questions">
      <span id="head">你可以这样问我</span>

      <template v-for="question in showQuestions" :key="question">
        <div class="q" @click="handleAskDQ(question)">
          <img src="../../assets/dialog.png" alt="" />
          <span>{{ question }}</span>
        </div>
      </template>
    </div>
    <div class="btn">
      <img src="../../assets/change.png" alt="" />
      <span @click="change">换一批</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, onMounted } from 'vue';
import { useUserContentStore } from '@/stores/index';

const defaultQuestions = ref([
  /* 景点 */
  '广州有什么旅游景点',
  '广州有什么好吃的',
  '广州有什么好玩的',
  '广州有什么好逛的',
  '广州一日游路线推荐',
  '广州夜景哪里好看',
  '广州亲子游去哪里',

  /* 美食 */
  '广州早茶必吃榜',
  '广州特色小吃有哪些',
  '广州最地道的烧腊店',

  /* 购物/逛街 */
  '广州逛街购物去哪里',
  '广州潮牌买手店推荐',

  /* 天气 */
  '广州今天天气怎么样',
  '广州明天会下雨吗',
  '广州本周天气预报',
  '广州现在温度多少',

  /* 火车 */
  '广州到深圳今天火车票',
  '广州到北京高铁时刻表',
  '广州南站到长沙最早班次',
  '广州到珠海城轨票查询',
]);
const emit = defineEmits(['send-dq']);
const userContentStore = useUserContentStore();
const handleAskDQ = (question) => {
  userContentStore.getRes(question);
  emit('send-dq');
};
// 打乱函数
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const showQuestions = computed(() => {
  return shuffle([...defaultQuestions.value]).slice(0, 4);
});
const change = () => {
  const item = defaultQuestions.value.shift();
  defaultQuestions.value.push(item);
};
onMounted(() => {
  change();
});
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
