<template>
  <div class="weather">
    <div class="item">
      <div class="time">11/09</div>
      <div class="sky">
        <img src="../../assets/cloud.png" alt="" />
        <span>晴</span>
      </div>
      <div class="temp">6~38℃</div>
    </div>
    <div class="item">
      <div class="time">11/09</div>
      <div class="sky">
        <img src="../../assets/cloud.png" alt="" />
        <span>晴</span>
      </div>
      <div class="temp">6~38℃</div>
    </div>
    <div class="item">
      <div class="time">11/09</div>
      <div class="sky">
        <img src="../../assets/cloud.png" alt="" />
        <span>晴</span>
      </div>
      <div class="temp">6~38℃</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.weather {
  max-width: 100%;
  background: linear-gradient(to bottom right, #ff779e, #ef3068);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  .item {
    display: flex;
    align-items: center;
    height: 20px;
    width: 100%;
    color: #1b1919;
    font-size: 7px;
    .time {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .sky {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 10px;
        margin-right: 3px;
      }
    }
    .temp {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
