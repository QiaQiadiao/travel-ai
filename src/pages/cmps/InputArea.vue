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
      <van-button type="default" size="mini">查询火车票</van-button>
      <van-button type="default" size="mini">查询天气</van-button>
      <van-button type="default" size="small" @click="toCompliantPage">
        一键投诉
      </van-button>
      <van-uploader>
        <van-button type="default" size="small">上传文件</van-button>
      </van-uploader>
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
const fileList = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  { url: 'https://cloud-image', isImage: true },
]);
const emit = defineEmits(['sendPrompts']);
const spanRef = ref();
const userContentStore = useUserContentStore();
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
    .van-button--default {
      font-size: 5px;
      height: 12px;
      width: 30px;
      border: none;
      padding: 2px;
      border-radius: 2px;
      margin-left: 5px;
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
