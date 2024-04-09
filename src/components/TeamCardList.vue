<script setup>
import { teamStatusEnum } from '../constants/team'
import { onMounted, ref } from 'vue'
import { getCurrentUserService } from '../api/user'
import { joinTeamService, quitTeamService, deleteTeamService } from '../api/team'
import router from '../router'
import {formatTime} from '../utils/format'
import logo from '../assets/logo.png'


const showPasswordDialog = ref(false)
const password = ref('')
const joinTeamId = ref(0)
const currentUser = ref()

defineProps({
  teamList: {
    required: true,
    type: Array
  }
})

onMounted(async () => {
  const res = await getCurrentUserService()
  currentUser.value = res.data
})

// 加入队伍前的预操作
const preJoinTeam = team => {
  joinTeamId.value = team.id
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true
  }
}

// 取消加入队伍
const doJoinCancel = () => {
  joinTeamId.value = 0
  password.value = ''
}

// 加入队伍
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return
  }
  const res = await joinTeamService({
    teamId: joinTeamId.value,
    password: password.value
  })
  showSuccessToast('加入队伍成功')
}

/**
 * 跳转至更新队伍页
 */
const doUpdateTeam = id => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}

/**
 * 退出队伍
 */
const doQuitTeam = async id => {
  const res = await quitTeamService({
    teamId: id
  })
  showSuccessToast('退出队伍成功')
}

/**
 * 解散队伍
 */
const doDeleteTeam = async id => {
  const res = await deleteTeamService({
    id
  })
  showSuccessToast('解散队伍成功')
}
</script>

<template>
  <div>
    <van-card
      v-for="(team, index) in teamList"
      :key="index"
      :thumb="logo"
      :desc="`队伍描述:${team.description}`"
      :title="`队伍名:${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + formatTime(team.expireTime) }}
        </div>
        <div>
          {{ '创建时间: ' +formatTime(team.createTime) }}
        </div>
      </template>
      <template #footer>
        <!-- 不是创建队伍的人并且没有加入队伍，显示加入队伍 -->
        <van-button
          size="small"
          type="primary"
          v-if="team.userId !== currentUser.id && !team.hasJoin"
          plain
          @click="preJoinTeam(team)"
        >
          加入队伍
        </van-button>
        <!--不是创建队伍的人，显示更新队伍 -->
        <van-button
          v-if="team.userId === currentUser.id"
          size="small"
          plain
          @click="doUpdateTeam(team.id)"
          >更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button
          v-if="team.userId !== currentUser.id && team.hasJoin"
          size="small"
          plain
          @click="doQuitTeam(team.id)"
          >退出队伍
        </van-button>
        <van-button
          v-if="team.userId === currentUser.id"
          size="small"
          type="danger"
          plain
          @click="doDeleteTeam(team.id)"
          >解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog
      v-model:show="showPasswordDialog"
      title="请输入密码"
      show-cancel-button
      @confirm="doJoinTeam"
      @cancel="doJoinCancel"
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>

<style scoped></style>
