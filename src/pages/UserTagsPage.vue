<script setup>
import { onMounted, ref } from 'vue'
import router from '../router'
import { userUpdateService, getCurrentUserService } from '../api/user'
const userId = ref()
const searchText = ref('')
// 搜索逻辑
const onSearch = () => {
  // 去除前后空格
  const searchTextValue = searchText.value.trim()
  if (searchTextValue !== '') {
    let tagFound = false
    tagList.forEach(parentTag => {
      parentTag.children.forEach(tag => {
        if (tag.text.includes(searchTextValue)) {
          if (!activeIds.value.includes(tag.id)) {
            activeIds.value.push(tag.id)
          } else {
            showFailToast('该标签已选择')
          }
          tagFound = true
        }
      })
    })
    if (!tagFound) {
      showFailToast('暂无该标签')
    }
  } else {
    showFailToast('请输入标签')
  }
}
const onCancel = () => {
  searchText.value = ''
}
const activeIds = ref([])
const activeIndex = ref(0)
const doClose = tag => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

onMounted(() => {
  getUserInfo()
})

const getUserInfo = async () => {
  const res = await getCurrentUserService()
  userId.value = res.data.id
  let tmepUserTags = res.data.tags.replace(/\\/g, '')
  activeIds.value = JSON.parse(tmepUserTags)
}

const onSubmit = async () => {
  let tmepUserTags = JSON.stringify(activeIds.value)
  const res = await userUpdateService({
    id: userId.value,
    tags: tmepUserTags
  })
  getUserInfo()
  showSuccessToast('更新成功')
}
const tagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' }
    ]
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
      { text: '研一', id: '研一' },
      { text: '研二', id: '研二' },
      { text: '研三', id: '研三' },
      { text: '高一', id: '高一' },
      { text: '高二', id: '高二' },
      { text: '高三', id: '高三' },
      { text: '其他', id: '其他' }
    ]
  },
  {
    text: '未来目标',
    children: [
      { text: '春招', id: '春招' },
      { text: '秋招', id: '秋招' },
      { text: '社招', id: '社招' },
      { text: '考研', id: '考研' },
      { text: '考公', id: '考公' }
    ]
  },
  {
    text: '学习方向',
    children: [
      { text: '前端', id: '前端' },
      { text: 'Java后端', id: 'Java后端' },
      { text: 'go后端', id: 'go后端' },
      { text: '运维', id: '运维' },
      { text: '大数据', id: '大数据' },
      { text: '测试', id: '测试' },
      { text: '算法', id: '算法' },
      { text: '人工智能', id: '人工智能' }
    ]
  },
  {
    text: '兴趣爱好',
    children: [
      { text: '旅游', id: '旅游' },
      { text: '美食', id: '美食' },
      { text: '电影', id: '电影' },
      { text: '读书', id: '读书' },
      { text: '摄影', id: '摄影' },
      { text: '游戏', id: '游戏' },
      { text: '手工', id: '手工' },
      { text: '绘画', id: '绘画' }
    ]
  },
  {
    text: '状态',
    children: [
      { text: '求职中', id: '求职中' },
      { text: '学习中', id: '学习中' },
      { text: '上班中', id: '上班中' },
      { text: '乐观', id: '乐观' },
      { text: 'emo', id: 'emo' }
    ]
  }
]
</script>

<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-empty
      image-size="3rem"
      description="未选择标签"
      class="empty"
      v-if="activeIds.length <= 0"
    />
    <van-tag
      class="tag"
      v-for="(tag, index) in activeIds"
      :key="index"
      closeable
      size="medium"
      type="primary"
      @close="doClose(tag)"
    >
      {{ tag }}
    </van-tag>
    <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
    />
    <van-button type="primary" class="search-button" block="true" @click="onSubmit"
      >确定</van-button
    >
  </div>
</template>

<style scoped lang="less">
.empty {
  height: 6rem;
}

.tag {
  margin-left: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.search-button {
  width: 80%;
  margin: 10px auto;
}
</style>
