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
  // recommendList.value = res.data.records
  recommendList.value = res.data.records.map(item => {
    item.tags = JSON.parse(item.tags.replace(/\\/g, ''))
    return item
  })
})
</script>

<template>
  <div style="margin-bottom: 60px;">
    <van-card
      v-for="(item, index) in recommendList"
      :key="index"
      desc="简介: 该用户比较懒,暂时没有设置"
      :title="item.username || '默认用户昵称'"
      :thumb="item.avatarUrl || 'https://source.damaomao.net/imgs/logo.png'"
    >
      <template #tags>
        <van-tag
          plain
          type="primary"
          v-for="(tag, index) in item.tags"
          :key="index"
          style="margin-right: 5px"
          >{{ tag ? tag : '该用户暂时未设置' }}</van-tag
        >
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
        <van-button size="mini">按钮</van-button>
      </template>
    </van-card>
  </div>
</template>

<style scoped lang="less"></style>
