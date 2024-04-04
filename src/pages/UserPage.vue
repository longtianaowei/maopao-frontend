<script setup>
import { onMounted,ref} from "vue";
import { getCurrentUserService } from '../api/user'
const user = ref([])
onMounted(async () => {
    const res = await getCurrentUserService()
    user.value = res.data
})
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
    <van-cell title="当前用户昵称" :value=user.username />
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="注册时间" :value=user.createTime />
    

</div>
</template>

<style scoped lang="less">
.top-image {
  display: block;
  margin: 1rem auto 1rem;
}
</style>

