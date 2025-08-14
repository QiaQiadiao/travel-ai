<template>
  <div class="input-box">
    <div class="photo">
      <!-- <van-uploader
        v-model="fileList"
        preview-size="60px"
        max-count="1"
        disabled
      /> -->
    </div>
    <div class="data-query">
      <van-button type="default" size="mini" @click="queryTrianTickets">
        查询火车票
      </van-button>
      <van-button type="default" size="mini" @click="getWeather">
        查询天气
      </van-button>
      <van-button type="default" size="small" @click="toCompliantPage">
        一键投诉
      </van-button>
      <div class="model">
        <van-button
          type="default"
          size="small"
          @click="selectQwen"
          :color="color1"
        >
          通义千问
        </van-button>
        <van-button
          type="default"
          size="small"
          @click="selectDS"
          :color="color2"
        >
          Deepseek
        </van-button>
      </div>
    </div>
    <div class="background">
      <div class="input">
        <img src="../../assets/clear.png" alt="" @click="clearPrompt" />
        <!-- <input type="text" class="input-content" placeholder="" /> -->
        <div class="input-container">
          <span
            class="editable-span"
            contenteditable="true"
            data-placeholder="有问题，问小粤！"
            role="textbox"
            aria-multiline="true"
            aria-label="输入框"
            ref="spanRef"
          ></span>
        </div>
        <img
          class="send"
          src="../../assets/send.png"
          alt=""
          @click="sendPrompt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useUserContentStore } from '@/stores/index';
import { useRouter } from 'vue-router';
const router = useRouter(); // 添加路由器
const emit = defineEmits(['sendPrompts']);
const spanRef = ref();
const userContentStore = useUserContentStore();
const color1 = ref('linear-gradient(to right, #ff6034, #ee0a24)'); // model按钮颜色
const color2 = ref(null);
// 发送用户问题
function sendPrompt() {
  // 发送请求
  // 发送对话框
  if (userContentStore.streamingId !== null) {
    console.log('跳过了');
    return;
  }
  if (spanRef.value.textContent !== '') {
    const str = spanRef.value.textContent.trim();
    emit('sendPrompts', true);
    userContentStore.getRes(str);
    spanRef.value.textContent = '';
  }
}
// 清理发送框
function clearPrompt() {
  spanRef.value.textContent = '';
}
// 跳转投诉页面
function toCompliantPage() {
  router.push('/compliant'); //跳转页面
}
function getWeather() {
  emit('sendPrompts', true);
  userContentStore.getRes('广州最近天气怎么样');
}
function queryTrianTickets() {
  emit('sendPrompts', true);
  userContentStore.getRes('我想要查询火车票');
}
function selectQwen() {
  if (color1.value) return;
  color1.value = 'linear-gradient(to right, #ff6034, #ee0a24)';
  color2.value = null;
  userContentStore.model = 'qwen-plus';
}
function selectDS() {
  if (color2.value) return;
  color2.value = 'linear-gradient(to right, #ff6034, #ee0a24)';
  color1.value = null;
  userContentStore.model = 'deepseek-chat';
}
</script>

<style scoped lang="less">
.input-box {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 239, 241, 0.8);

  :deep(.van-uploader__wrapper--disabled) {
    opacity: inherit;
    .van-uploader__preview {
      background-color: #fff;
    }
  }
  .photo {
    position: absolute;
    top: -25px;
    left: 6px;
    .van-uploader__wrapper {
      position: relative;
      align-items: center;
    }
  }
  .data-query {
    display: flex;
    align-items: center;
    margin-top: 2px;
    .model {
      display: flex;
      // width: 60px;
      // justify-content: center;
      // align-items: center;
      // flex: 2;
    }
    .van-button--default {
      font-size: 5px;
      height: 12px;
      width: 30px;
      border: none;
      padding: 2px;
      border-radius: 2px;
      margin-left: 2px;
    }
    .van-button {
      margin-bottom: 2px;
      border: 0.5px solid #ccc;
    }
  }
  .input {
    display: flex;
    align-items: center;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 5px;
    background-color: #fff1f4;
    padding-bottom: 5px;
    padding-top: 2px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    img {
      width: 10px;
      height: 10px;
      margin: 0 5px;
    }
    .send {
      width: 10px;
    }
    .input-content {
      border: none;
      height: 12px;
      width: 110px;
      background-color: #ececec;
      padding: 1px;
      padding-left: 3px;
      border-radius: 3px;
    }
  }
}
.background {
  background-color: transparent;
}
.input-container {
  width: 110px;
  margin: 2px 0;
}

.editable-span {
  display: block;
  max-height: 42px;
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 7px;
  line-height: 1.5;
  overflow-y: auto;
  background-color: #fff1f4;
  // word-wrap: break-word; // 会出现bug 中英文不能一行显示
  white-space: pre-wrap;
  outline: none;
  transition: border-color 0.2s;
}

.editable-span:empty:before {
  content: attr(data-placeholder);
  color: #999;
  font-style: italic;
}
</style>
