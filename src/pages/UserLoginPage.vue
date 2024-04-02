<script setup>
import { ref } from 'vue'
import router from '../router'
const text = ref('')
const password = ref('')
const toRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div>
    <van-image
      round
      width="10rem"
      height="10rem"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      class="top-image"
    />
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="text" label="账号" placeholder="请输入账号" />
      <!-- 输入密码 -->
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" class="login-button" block="true">登陆</van-button>
    <p @click="toRegister">还没有账号？点击注册</p>
  </div>
</template>

<style scoped lang="less">
.login-button {
  width: 80%;
  margin: 10px auto;
}

.top-image{
    display: block;
    margin: 8rem auto 1rem;
}

p{
   margin-left: 12rem;
   font-size: 14px;
   color: #969799;
}
</style>
