<template>
  <div class="goods-recom">
    <p class="text">为你推荐以下相关酒店，官方严选：</p>
    <div class="list">
      <div class="item">
        <img src="../../assets/bg-gz-2.png" alt="" />
        <span class="name text-show">
          广州小蛮腰酒店我就欧服外界哦分312321312
        </span>
        <span class="price">￥2999</span>
      </div>
      <div class="item">
        <img src="../../assets/bg-gz-2.png" alt="" />
        <span class="name text-show">
          广州小蛮腰酒店我就欧服外界哦分312321312
        </span>
        <span class="price">￥2999</span>
      </div>
      <div class="item">
        <img src="../../assets/bg-gz-2.png" alt="" />
        <span class="name text-show">
          广州小蛮腰酒店的肌肤撒开绿灯九十六欧服外界哦分
        </span>
        <span class="price">￥2999</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.goods-recom {
  width: 100%;
  background-color: #fff;
  margin-top: 2px;
  .text {
    width: 100%;
    font-size: 6px;
    padding: 1px;
    margin-left: 3px;
  }
  .list {
    max-width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    padding: 1px 2px;
    .item {
      display: flex;
      flex-direction: column;
      width: 55px;
      background-color: #ccc;
      margin: 2px;
      flex-shrink: 0;
      border-radius: 3px;
      img {
        width: 100%;
        border-radius: 3px;
        background-color: skyblue;
      }
      .name {
        font-size: 6px;
        margin: 1px;
      }
      .price {
        font-size: 6px;
      }
    }
  }
}
</style>
