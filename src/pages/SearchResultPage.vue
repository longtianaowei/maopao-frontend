<script setup>
const searchList = {
  avatarUrl: 'https://source.damaomao.net/imgs/logo.png',
  planetCode: '1',
  tags: ['男', '大三', '前端'],
  userAccount: 'maomao',
  userRole: 0,
  username: '毛毛'
}
</script>

<template>
  <div>
    <van-card v-for=" (item,index) in 5" :key="index"
      num="2"
      price="2.00"
      desc="描述信息"
      :title=searchList.username
      :thumb=searchList.avatarUrl
    >
      <template #tags>
        <van-tag plain type="primary" v-for="(tag,index) in searchList.tags" :key="index" style="margin-right: 5px;">{{ tag }}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
        <van-button size="mini">按钮</van-button>
      </template>
    </van-card>
  </div>
</template>

<style scoped lang="less">
</style>
