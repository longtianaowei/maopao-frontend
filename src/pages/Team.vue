<script setup>
import TeamCardList from '../components/TeamCardList.vue'
import { getTeamListService ,getMyTeamList} from '../api/team'
import {getCurrentUserService} from '../api/user'
import { onMounted, ref } from 'vue'
import router from '../router'
const teamList = ref([])
const searchObj = ref({
  status: 0,
  searchText: ''

})
const userId = ref()
const currentUser = ref()
onMounted(() => {
  getTeamList()
  getUserId()
})

const getUserId = async () => {
  const res = await getCurrentUserService()
  userId.value = res.data.id
}
const getMyTeam =async () => {
  const res = await getTeamListService(userId.value)
  teamList.value = res.data
}

const getTeamList = async () => {
  const res = await getTeamListService(searchObj.value)
  teamList.value = res.data
}
const onSearch = () => {
  getTeamList()
  searchObj.value.searchText = ''
}
const active = ref(0)
const onTabChange = name => {
  if (name == 'public') {
    searchObj.value.status = 0
    getTeamList()
  }
  if (name == 'password') {
    searchObj.value.status = 2
    getTeamList()
  }
  if (name == 'private') {
    getMyTeam()
  }
}
const toAddTeam = () => {
    router.push('/team/create')
}
</script>

<template>
  <div class="box">
    <van-search
      v-model="searchObj.searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="password" />
      <van-tab title="我的" name="private" />
    </van-tabs>
    <TeamCardList :teamList="teamList"></TeamCardList>
    <van-empty image="search" description="暂无数据" v-if="teamList==null || teamList.length <= 0" />
    <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
  </div>
</template>

<style scoped lang="less">
.box{
    margin-bottom: 100px;
    .add-button {
    position: fixed;
    bottom: 60px;
    width: 50px;
    right: 12px;
    height: 50px;
    border-radius: 50%;
}
}

</style>
