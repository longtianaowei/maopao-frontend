<script setup>
import { ref, onMounted } from 'vue'
import { userSearchService } from '../api/user'
import { useRoute } from 'vue-router'
import UserCardList from '../components/UserCardList.vue'
const route = useRoute()
const { tags } = route.query
const searchUserList = ref([])
onMounted(async () => {
  const res = await userSearchService(tags)
  searchUserList.value = res.data.map(item => {
    item.tags = JSON.parse(item.tags.replace(/\\/g, ''))
    return item
  })
})
</script>

<template>
  <div>
    <UserCardList :userList = searchUserList ></UserCardList>
    <van-empty image="search" description="暂无该用户" v-if="searchUserList.length <= 0" />
  </div>
</template>

<style scoped lang="less"></style>
