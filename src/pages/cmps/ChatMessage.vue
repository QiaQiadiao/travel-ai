<template>
  <div class="dialog">
    <div class="userMessage">
      你的房间打扫了房间的撒风口浪尖的设计费杜绝方式垃圾开发时的加拉
    </div>
    <div class="sendImage">
      <van-image
        width="120px"
        height="120px"
        fit="cover"
        radius="5"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="ai">
      <img src="../../assets/girl.png" alt="" />
      <div class="text">小粤</div>
    </div>
    <div class="aiMessage">
      <loading></loading>
      <!-- ai1221414324 大家萨弗克拉金克拉撒旦发的洒家分厘卡圣诞节付款了3 -->
    </div>
    <TrainTicket></TrainTicket>
    <Weather></Weather>
    <GoodsRecom></GoodsRecom>
  </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue';
import TrainTicket from '../toolCmps/TrainTicket.vue';
import Weather from '../toolCmps/Weather.vue';
import GoodsRecom from '../toolCmps/GoodsRecom.vue';
</script>

<style scoped lang="less">
.dialog {
  width: 90%;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  .userMessage {
    font-size: 6px;
    padding: 3px;
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
    max-width: 100%;
    padding: 3px;
    background-color: #fff1f4;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 6px;
  }
}
</style>
