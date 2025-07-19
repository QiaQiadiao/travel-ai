<template>
  <div class="items">
    <div class="item">
      <div class="station">
        <p class="time">06:35</p>
        <p class="place">广州南</p>
      </div>
      <div class="detail">
        <p class="duration">2小时14分</p>
        <p class="index">D8653</p>
      </div>
      <div class="station">
        <p class="time">09:10</p>
        <p class="place">佛山</p>
      </div>
      <div class="price">
        <span>￥199</span>
      </div>
    </div>
    <div class="item">
      <div class="station">
        <p class="time">06:35</p>
        <p class="place">佛山</p>
      </div>
      <div class="detail">
        <p class="duration">2小时14分</p>
        <p class="index">D8653</p>
      </div>
      <div class="station">
        <p class="time">09:10</p>
        <p class="place">佛山</p>
      </div>
      <div class="price">
        <span>￥199</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.items {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 2px;
  .item {
    width: 95%;
    height: 25px;
    margin: 3px auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #ccc;
    .station {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      font-size: 6px;
      justify-content: center;
      align-items: center;
      .time {
        font-size: 7px;
        font-weight: bold;
      }
      .place {
        font-size: 6px;
        color: #2a2a2a;
      }
    }
    .detail {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #57585c;
      .duration {
        font-size: 5px;
      }
      .index {
        font-size: 5px;
      }
    }
    .price {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b3244e;
      font-size: 8px;
    }
  }
}
</style>
