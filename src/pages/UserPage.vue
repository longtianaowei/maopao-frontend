<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentUserService, userLoginoutService } from '../api/user'
import { formatTime } from '../utils/format'
import router from '../router'
const user = ref([])
onMounted(async () => {
  const res = await getCurrentUserService()
  if (res.data.username === null) {
    res.data.username = '默认用户昵称'
  }
  user.value = res.data
})
const loginout = async () => {
  // 删除存储在 cookie 中的会话信息
  document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  showSuccessToast('退出登陆成功')
  router.push('/login')
}
</script>

<template>
  <div>
    <van-image round width="10rem" height="10rem" :src="user.avatarUrl" class="top-image" />
    <van-cell title="当前用户昵称" :value="user.username" />
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="注册时间" :value="formatTime(user.createTime)" />
    <van-button type="primary" class="loginout-button" @click="loginout">退出登录</van-button>
  </div>
</template>

<style scoped lang="less">
.top-image {
  display: block;
  margin: 1rem auto 1rem;
}

.loginout-button {
  display: block;
  width: 80%;
  margin: 10px auto;
}
</style>
