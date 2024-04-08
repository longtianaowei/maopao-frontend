<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '../router'

const active = ref(0)
const onClickLeft = () => history.back()
const onClickRight = () => {
  router.push('/search')
}
const title = ref('冒泡校园')
router.beforeEach((to, from, next) => {
  const newTitle = to.meta.title
  title.value = newTitle || '冒泡校园'
  next()
})
</script>

<template>
  <div class="laybox">
    <!-- 顶部navbar -->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <!-- 底部tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/team" icon="friends-o">队伍</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less"></style>
