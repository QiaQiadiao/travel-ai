<template>
  <div class="box">
    <div class="ai">
      <img src="../../assets/girl.png" alt="" />
      <div class="text">小粤</div>
    </div>
    <div class="questions">q1q2</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.box {
  width: 100%;
  margin-top: 10px;
  .ai {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 122px;

    img {
      width: 18px;
    }
    .text {
      //   margin-left: 1px;
      font-size: 6px;
      font-weight: normal;
    }
  }
  .questions {
    width: 95%;
    height: 120px;
    margin: 0 auto;
    background-color: #ccc;
  }
}
</style>
