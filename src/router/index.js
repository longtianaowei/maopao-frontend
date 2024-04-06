import { createRouter, createWebHistory } from 'vue-router'
// 定义一些路由
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import UserPage from '../pages/UserPage.vue'
import SearchPage from '../pages/SearchPage.vue'
import layout from '../layouts/BasicLayout.vue'
import UserLoginPage from '../pages/UserLoginPage.vue'
import UserRegisterPage from '../pages/UserRegisterPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import UpdateUserInfo from '../pages/UpdateUserInfo.vue'
import UserEditPage from '../pages/UserEditPage.vue'
import UserTagsPage from '../pages/UserTagsPage.vue'
import TeamAddPage from '../pages/TeamAddPage.vue'

const routes = [
  { path: '/login', component: UserLoginPage },
  { path: '/register', component: UserRegisterPage },
  {
    path: '/',
    component: layout,
    redirect: '/login',
    children: [
      { path: '/index', component: Index },
      { path: '/team', title: '找队伍', component: Team },
      { path: '/user', title: '用户中心', component: UserPage },
      { path: '/search', title: '搜索表单', component: SearchPage },
      { path: '/search/result', title: '搜索结果', component: SearchResultPage },
      { path: '/user/update', title: '用户详细信息', component: UpdateUserInfo },
      { path: '/user/edit', title: '用户信息编辑', component: UserEditPage },
      { path: '/user/tags', title: '用户标签编辑', component: UserTagsPage },
      { path: '/team/create', title: '创建队伍', component: TeamAddPage }
    ]
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes // `routes: routes` 的缩写
})

export default router
