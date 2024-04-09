<script setup>
import { userLoginService } from '../api/user'
import { ref } from 'vue'
import router from '../router'
import logo from '../assets/logo.png'
const formModel = ref({
  userAccount: '',
  userPassword: ''
})
const toRegister = () => {
  router.push('/register')
}
const login = async () => {
  const res = await userLoginService(formModel.value)
  router.push('/index')
  showSuccessToast('登录成功')
}
</script>

<template>
  <div>
    <van-image
      round
      width="10rem"
      height="10rem"
      :src="logo"
      class="top-image"
    />
    <van-form @submit="login">
      <van-cell-group inset>
        <van-field
          v-model="formModel.userAccount"
          label="账号"
          name="pattern"
          placeholder="请输入账号"
          :rules="[{ pattern: /^\S{4,10}$/, message: '账号必须是4-10位的非空字符' }]"
        />
        <van-field
          v-model="formModel.userPassword"
          label="密码"
          type="password"
          name="pattern"
          placeholder="请输入密码"
          :rules="[{ pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登陆 </van-button>
      </div>
    </van-form>
    <p @click="toRegister">还没有账号？点击注册</p>
  </div>
</template>

<style scoped lang="less">
.login-button {
  width: 80%;
  margin: 10px auto;
}

.top-image {
  display: block;
  margin: 8rem auto 1rem;
}

p {
  margin-left: 12rem;
  font-size: 14px;
  color: #969799;
}
</style>
