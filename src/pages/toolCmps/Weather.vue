<template>
  <div class="weather">
    <div class="item" v-for="item in processWeatherData" :key="item.week2">
      <div class="time">{{ item.week2 }}</div>
      <div class="sky">
        <div class="icon-box">
          <img :src="item.img1" alt="" />
          <img v-if="item.wea1 !== item.wea2" :src="item.img2" />
        </div>
        <span>
          {{
            item.wea1 === item.wea2 ? item.wea1 : item.wea1 + '转' + item.wea2
          }}
        </span>
      </div>
      <div class="temp">{{ item.wendu2 + '~' + item.wendu1 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['weatherData']);
const processWeatherData = computed(() => {
  return props.weatherData.map((item) => {
    // let wea2 = item.wea2
    // if(item.wea1 === item.wea2) {
    //   wea2 = ''
    // }
    return {
      ...item,
    };
  });
});
</script>

<style scoped lang="less">
.weather {
  max-width: 100%;
  background: linear-gradient(to bottom right, #ff779e, #ef3068);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
      flex: 2;
      display: flex;
      justify-content: start;
      align-items: center;
      span {
        flex: 3;
        font-size: 6px;
      }
      .icon-box {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
        width: 25px;
        img {
          width: 10px;
          // margin-right: 3px;
        }
      }
    }
    .temp {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
