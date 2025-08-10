<template>
  <div class="items">
    <div
      class="item"
      v-for="item in processQueryData"
      :key="item.train_number + item.depart_time"
    >
      <div class="station">
        <p class="time">{{ item.depart_time }}</p>
        <p class="place">{{ item.depart_name }}</p>
      </div>
      <div class="detail">
        <p class="duration">{{ item.duration }}</p>
        <p class="index">{{ item.train_number }}</p>
      </div>
      <div class="station">
        <p class="time">{{ item.arrive_time }}</p>
        <p class="place">{{ item.arrive_name }}</p>
      </div>
      <div class="price">
        <span class="type">{{ item.seat_type }}</span>
        <span class="nums">数量：{{ item.seat_stock }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

// import { useUserContentStore } from '@/stores/index';
// const userContentStore = useUserContentStore()
const props = defineProps(['queryData']);
const processQueryData = computed(() => {
  return props.queryData
    .map((item) => {
      let [h, m] = item.duration.split(':');
      if (h === '00') h = '';
      else if (h[0] === '0') h = h[1];
      if (m === '00') m = '';
      else if (m[0] === '0') m = m[1];

      let newDuration = '';
      if (h === '') newDuration = `${m}分钟`;
      else if (m === '') newDuration = `${h}小时`;
      else newDuration = `${h}小时${m}分钟`;
      return {
        ...item,
        duration: newDuration,
      };
    })
    .slice(0, 30);
});
</script>

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
        font-size: 4px;
        margin-bottom: 1px;
      }
      .index {
        font-size: 6px;
        font-weight: bolder;
      }
    }
    .price {
      flex: 1.6;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #b3244e;
      font-size: 8px;
      .type {
        font-size: 6px;
      }
      .nums {
        font-size: 5px;
      }
    }
  }
}
</style>
