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
import TeamUpdatePage from '../pages/TeamUpdatePage.vue'
import TeamMyCreate from '../pages/TeamMyCreate.vue'
import TeamMyJoin from '../pages/TeamMyJoin.vue'

const routes = [
  { path: '/login', component: UserLoginPage },
  { path: '/register', component: UserRegisterPage },
  {
    path: '/',
    component: layout,
    redirect: '/login',
    children: [
      { path: '/index', component: Index, meta: { title: '冒泡校园' } },
      { path: '/team', component: Team, meta: { title: '找队伍' } },
      { path: '/user', component: UserPage, meta: { title: '用户中心' } },
      { path: '/search', component: SearchPage, meta: { title: '搜索用户' } },
      { path: '/search/result', component: SearchResultPage, meta: { title: '搜索结果' } },
      { path: '/user/update', component: UpdateUserInfo, meta: { title: '用户详细信息' } },
      { path: '/user/edit', component: UserEditPage, meta: { title: '用户信息编辑' } },
      { path: '/user/tags', component: UserTagsPage, meta: { title: '标签选择' } },
      { path: '/team/create', component: TeamAddPage, meta: { title: '创建队伍' } },
      { path: '/team/update', component: TeamUpdatePage, meta: { title: '更新队伍' } },
      { path: '/user/team/create', component: TeamMyCreate, meta: { title: '我创建的队伍' } },
      { path: '/user/team/join', component: TeamMyJoin, meta: { title: '我加入的队伍' } }
    ]
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes // `routes: routes` 的缩写
})

export default router
