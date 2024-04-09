<script setup>
import { ref } from 'vue'
import router from '../router'
import { userRegisterService } from '../api/user'
import logo from '../assets/logo.png'
const formModel = ref({
  userAccount: '',
  planetCode: '',
  userPassword: '',
  checkPassword: ''
})

const onRegister = async () => {
  const res = await userRegisterService(formModel.value)
  router.push('/login')
  showSuccessToast('注册成功')
}

const toLogin = () => {
  router.push('/login')
}
</script>
<template>
  <div>
    <van-image round width="10rem" height="10rem" :src="logo" class="top-image" />
    <van-form @submit="onRegister">
      <van-cell-group inset>
        <van-field
          v-model="formModel.planetCode"
          label="编号"
          name="pattern"
          placeholder="请输入编号"
          :rules="[{ pattern: /^\d{1,4}$/, message: '编号必须是1-4位的数字' }]"
        />
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
        <van-field
          v-model="formModel.checkPassword"
          label="确认密码"
          type="password"
          name="validator"
          placeholder="请再次输入密码"
          :rules="[
            { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符' },
            {
              validator: val => {
                if (val !== formModel.userPassword) {
                  return false
                }
              },
              message: '两次密码不一致'
            }
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 注册 </van-button>
      </div>
    </van-form>
    <p @click="toLogin">已有账号？点击登录</p>
  </div>
</template>

<style scoped lang="less">
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
