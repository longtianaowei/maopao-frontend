<script setup>
import { ref } from 'vue'
import router from '../router'
const username = ref('')
const useraccount = ref('')
const password = ref('')
const repassword = ref('')
const rules = ref({
  username: [
    { required: true, message: '请输入用户名' }
  ],
  useraccount: [
    { required: true, message: '请输入账号' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码' }
  ]
})

const register = () => {
  // 在注册按钮点击时进行全部字段的校验
  Form.validate(formData).then(() => {
    // 校验通过，执行注册逻辑
  }).catch(() => {
    // 校验不通过，可以使用 Toast 提示用户
    Toast('请填写正确信息')
  })
}
const toLogin = () => {
  router.push('/login')
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
    <van-form required="auto">
      <van-field v-model="username" :rules="rules.username" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="useraccount" :rules="rules.useraccount" label="账号" placeholder="请输入账号" />
      <van-field v-model="password" type="password" :rules="rules.password" label="密码" placeholder="请输入密码" />
      <van-field v-model="repassword" type="password" :rules="rules.repassword" label="确认密码" placeholder="请输入密码" />
      <van-button type="primary" class="login-button" block="true" @click="register">注册</van-button>
      <p @click="toLogin">已有账号？点击登录</p>
    </van-form>
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
