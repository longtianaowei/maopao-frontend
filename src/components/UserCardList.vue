<script setup>
defineProps({
    userList: {
    required: true,
    type: Array
  }
})
</script>

<template>
  <van-card
      v-for="(item, index) in userList"
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
</template>

<style lang="less">
</style>
