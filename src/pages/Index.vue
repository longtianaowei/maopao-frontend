<script setup>
import { onMounted, ref } from 'vue'
import { userRecommendService } from '../api/user'
const queryObj = {
  // 当前页数
  pageNum: 1,
  // 每页显示条数
  pageSize: 5
}
const recommendList = ref([])
onMounted(async () => {
  const res = await userRecommendService(queryObj)
  recommendList.value = res.data.records.map(item => {
    item.tags = JSON.parse(item.tags.replace(/\\/g, ''))
    return item
  })
})
</script>

<template>
  <div style="margin-bottom: 60px;">
    <UserCardList :userList = recommendList ></UserCardList>
    <van-empty image="search" description="暂无用户" v-if="recommendList.length <= 0" />
  </div>
</template>

<style scoped lang="less"></style>
