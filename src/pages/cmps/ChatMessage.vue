<template>
  <div class="dialog">
    <!-- <div class="sendImage">
      <van-image
        width="120px"
        height="120px"
        fit="cover"
        radius="5"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div> -->
    <div class="ai">
      <img src="../../assets/girl.png" alt="" />
      <div class="text">小粤</div>
    </div>

    <!-- <template v-for="item in userContentStore.messages" :key="item.id">
      <div v-if="item.role === 'user'" class="userMessage">
        {{ item.content }}
      </div>
      <div v-else-if="item.role === 'system'" class="aiMessage">
        <p v-if="item.done">{{ item.content }}</p>
        <p v-else>
          {{ item.content }}{{ userContentStore.currentDelta }}
          <loading v-if="!item.done" />
        </p>
      </div>
    </template> -->

    <template v-for="item in userContentStore.messages" :key="item.id">
      <div v-if="item.role === 'user'" class="userMessage">
        {{ item.content }}
      </div>
      <div v-else-if="item.role === 'system'" class="aiMessage">
        <p v-if="item.done" v-html="mdToHtml(item.content)"></p>
        <p v-else>
          <span
            v-html="mdToHtml(item.content + userContentStore.currentDelta)"
          />
          <loading v-if="!item.done" />
        </p>
      </div>
    </template>
    <!-- <div class="aiMessage">
      <p>
        123123
        <loading />
      </p>
    </div> -->
    <!-- <TrainTicket></TrainTicket>
    <Weather></Weather>
    <GoodsRecom></GoodsRecom> -->
  </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue';
import TrainTicket from '../toolCmps/TrainTicket.vue';
import Weather from '../toolCmps/Weather.vue';
import GoodsRecom from '../toolCmps/GoodsRecom.vue';
import { nextTick, ref, watch, defineEmits } from 'vue';
import { useUserContentStore } from '@/stores/index';
import { mdToHtml } from '@/apis';
const userContentStore = useUserContentStore();
const msg = ref('1322');
const emit = defineEmits(['dialogChange']);
let inThrottle = true;
// 实时滚动，ai流式信息
watch(
  () => userContentStore.currentDelta,
  async () => {
    if (inThrottle) {
      let timerThrottle = setTimeout(async () => {
        await nextTick();
        emit('dialogChange', true);
        inThrottle = true;
        clearTimeout(timerThrottle);
      }, 100);
    }
    inThrottle = false;
  },
);

// const timer = setInterval(() => {
//   let newWords = '123';
//   msg.value += newWords;
// }, 100);user
// setTimeout(() => {
//   clearInterval(timer);
// }, 50000);
</script>

<style scoped lang="less">
// 引入md样式
.dialog {
  width: 90%;
  margin: 5px auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  // 自动跟随
  .userMessage {
    font-size: 6px;
    padding: 3px;
    margin: 5px 0;
    max-width: 80%;
    background-color: #ffabc3;
    color: #1a1a19;
    align-self: flex-end;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    animation: popup 0.2s ease-in-out forwards;
    @keyframes popup {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .sendImage {
    display: flex;
    flex-direction: column;
    .van-image {
      align-self: flex-end;
      margin-top: 2px;
      animation: popup 0.2s ease-in-out forwards;
      @keyframes popup {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
  .ai {
    display: flex;
    align-items: center;
    img {
      width: 10px;
    }
    .text {
      font-size: 6px;
      font-weight: normal;
      font-family: 'AlimamaDaoLiTi', sans-serif;
    }
  }
  .aiMessage {
    align-self: start;
    position: relative;
    max-width: 95%;
    padding: 4px;
    // padding-top: 1px;
    // padding-bottom: 5px;
    background-color: #fff1f4;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 6px;
    // 换行
    word-break: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    p {
      font-size: 6px;
      position: relative;
    }
  }
}
</style>
