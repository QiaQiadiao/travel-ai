<template>
  <div class="box">
    <img src="../../assets/bg-gz.png" alt="" />
    <!-- <img src="../../assets/bg-gz-2.png" alt=""> -->
    <div class="intro">
      <div class="headline">Hi,我是小粤~</div>
      <div class="text">
        你的专属旅游助手，可以帮助你规划行程、解答出游问题哟！
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  img {
    height: 90px;
    // margin-left: -20px;
  }
  .intro {
    margin-right: 5px;
    .headline {
      font-family: 'AlimamaDaoLiTi', sans-serif;
      font-size: 10px;
      color: rgb(135, 31, 31);
    }
    .text {
      margin-top: 5px;
      font-size: 6px;
      line-height: 12px;
      font-weight: bold;
    }
    // text-align: center;
    // margin-top: 100px;
  }
}
</style>
