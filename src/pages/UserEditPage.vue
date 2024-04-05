<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { userUpdateService, getCurrentUserService } from '../api/user'
import router from '../router';

const route = useRoute()
// 解构
const { key, editName, value } = route.query
const editUser = ref({
  key,
  editName,
  value
})
const onSubmit = async () => {
  const currentUser = await getCurrentUserService()
  const res = await userUpdateService({
    id: currentUser.data.id,
    [editUser.value.key]: editUser.value.value
  })
  router.push('/user/update')
  showSuccessToast('更新成功')
}
</script>
<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="editUser.value"
        :name="editUser.key"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="less"></style>
