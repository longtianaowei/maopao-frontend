<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentUserService, userUpdateService, userUpdateAvatar } from '../api/user'
import router from '../router'
const user = ref([])
onMounted(() => {
  getUserInfo()
})

const getUserInfo = async () => {
  const res = await getCurrentUserService()
  if (res.data.username === null) {
    res.data.username = '默认用户昵称'
  }
  if (res.data.gender === 0) {
    res.data.gender = '女'
  } else if (res.data.gender === 1) {
    res.data.gender = '男'
  } else {
    res.data.gender = '未知'
  }
  user.value = res.data
}

const toEdit = (key, editName, value) => {
  router.push({
    path: '/user/edit',
    query: {
      key,
      editName,
      value
    }
  })
}

const show = ref(false)
const showAvatar = ref(false)
const checked = ref('')
// 更新性别
const updateGender = async () => {
  const res = await userUpdateService({
    id: user.value.id,
    gender: checked.value
  })
  getUserInfo()
  showSuccessToast('更新成功')
}

// 处理文件上传成功后的回调
const afterRead = async file => {
  // 创建一个 FormData 对象
  const formData = new FormData()
  formData.append('avatar', file.file) // 将选择的文件添加到 FormData 中
  // 发送上传请求
 const res = await userUpdateAvatar(formData)

}
const onOversize = file => {
  console.log(file)
  showToast('文件大小不能超过 2MB')
}
</script>
<template>
  <div>
    <van-cell center title="头像" style="height: 60px" is-link @click="showAvatar = true">
      <van-image width="50" height="50" radius="3px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      to="/user/edit"
      :value="user.username"
      @click="toEdit('username', '昵称', user.username)"
    />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="性别" is-link :value="user.gender" @click="show = true" />
    <van-cell
      title="我的标签"
      is-link
      to="/user/tags"
      value="点击查看"
    />
    <van-cell
      title="电话"
      is-link
      to="/user/edit"
      :value="user.phone"
      @click="toEdit('phone', '电话', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      to="/user/edit"
      :value="user.email"
      @click="toEdit('email', '邮箱', user.email)"
    />
    <van-cell title="编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="user.createTime" />
    <!-- 性别修改弹出框 -->
    <van-dialog v-model:show="show" title="性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="checked" direction="horizontal" style="margin: 10px 30%">
        <van-radio name="1" style="margin-right: 20px">男</van-radio>
        <van-radio name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <!-- 头像上传框 -->
    <van-popup v-model:show="showAvatar" round :style="{ padding: '64px' }">
        <van-uploader
        preview-image="true"
        preview-full-image="true"
        :max-size="2048 * 1024"
        :after-read="afterRead"
        @oversize="onOversize"
      />
    </van-popup>
  </div>
</template>
<style scoped>
</style>
