<template>
  <van-nav-bar
    title="投诉"
    left-arrow
    @click-left="onClickLeft"
    fixed
    placeholder
  />
  <div class="box">
    <div class="item">
      <p>您要投诉谁</p>
      <van-field
        is-link
        readonly
        placeholder="选择投诉对象"
        @click="showPicker1 = true"
      />
      <van-popup destroy-on-close round position="bottom" :show="showPicker1">
        <van-picker
          :columns="objs"
          title="投诉对象"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
    </div>
    <div class="item">
      <p>请告诉我们发生什么事了</p>
      <div class="input-box">
        <textarea name="" id="" placeholder="请输入投诉原因"></textarea>
      </div>
    </div>
    <div class="item">
      <p>这件事发生在哪里</p>
      <van-field
        is-link
        readonly
        placeholder="请选择事件发生地"
        @click="showPicker = true"
      />
      <van-popup destroy-on-close round position="bottom" :show="showPicker">
        <van-picker
          :columns="gzDistricts"
          title="发生地点"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <div class="item">
      <p>您的诉求是什么</p>
      <div class="input-box">
        <textarea name="" id="" placeholder="请输入您的诉求"></textarea>
      </div>
    </div>
    <div class="item">
      <p>最后，我们需要了解您的个人信息，用于核实事件以及告知您处理结果</p>
      <div class="input-box">
        <textarea name="" id="" placeholder="请输入您的诉求"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const onClickLeft = () => {};
const objs = ref([
  { text: '导游', value: '001' },
  { text: '旅行社', value: '002' },
  { text: '商家', value: '003' },
  { text: '景区', value: '004' },
]);
const gzDistricts = ref([
  { text: '越秀区', value: 'Yuexiu' },
  { text: '海珠区', value: 'Haizhu' },
  { text: '荔湾区', value: 'Liwan' },
  { text: '天河区', value: 'Tianhe' },
  { text: '白云区', value: 'Baiyun' },
  { text: '黄埔区', value: 'Huangpu' },
  { text: '花都区', value: 'Huadu' },
  { text: '番禺区', value: 'Panyu' },
  { text: '南沙区', value: 'Nansha' },
  { text: '从化区', value: 'Conghua' },
  { text: '增城区', value: 'Zengcheng' },
]);
const showPicker = ref(false);
const onConfirm = ref();
const showPicker1 = ref(false);
const onConfirm1 = ref();
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  height: 20px;
  .van-nav-bar__title {
    font-size: 8px !important;
  }

  i {
    font-size: 10px;
    color: black;
  }
}
.box {
  .item {
    p {
      margin-top: 5px;
      margin-bottom: 2px;
      font-size: 7px;
      font-weight: bold;
      margin-left: 8px;
    }
    .van-cell {
      font-size: 6px;
      width: 100%;
      margin: 0;
      padding: 0 10px;
      :deep(label) {
        font-size: 6px;
      }
      :deep(input) {
        font-size: 6px;
      }
      :deep(i) {
        font-size: 8px;
      }
    }
    .input-box {
      display: flex;
      width: 100%;
      background-color: white;
      height: 45px;
      textarea {
        width: 90%;
        margin: 5px auto;
        border: none;
        line-height: 1.5;
        font-size: 6px;
      }
    }
    :deep(i) {
      font-size: 10px;
    }

    :deep(.van-picker__cancel) {
      font-size: 8px;
    }
    :deep(div) {
      font-size: 8px;
    }
    :deep(.van-picker__confirm) {
      font-size: 8px;
    }
  }
}
</style>
