<script setup>
import TeamCardList from '../components/TeamCardList.vue'
import { getMyJoinTeamList } from '../api/team'
import { onMounted, ref } from 'vue'
import router from '../router'
const teamList = ref([])
const searchObj = ref({
  searchText: ''
})
onMounted(() => {
  getTeamList()
})

const getTeamList = async () => {
  const res = await getMyJoinTeamList(searchObj.value)
  teamList.value = res.data
}
const onSearch = () => {
  getTeamList()
  searchObj.value.searchText = ''
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
