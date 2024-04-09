<script setup>
import { onMounted, ref } from 'vue'
import { getTeamById,updateTeamService } from '../api/team'
import { useRoute } from 'vue-router'
const route = useRoute()
// 解构
const { id } = route.query
const updateTeamData = ref({})

onMounted(async () => {
  const res = await getTeamById(id)
  updateTeamData.value = res.data
})

const onConfirm = ({ selectedValues }) => {
  updateTeamData.value.expireTime = selectedValues.join('-')
  showPicker.value = false
}

const showPicker = ref(false)
const minDate = new Date()

// 提交
const onSubmit = async () => {
  const res = await updateTeamService(updateTeamData.value)
}
import {formatTime} from '../utils/format'
</script>
<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="updateTeamData.name"
          name="队伍名"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '队伍名为空' }]"
        />
        <van-field
          v-model="updateTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
          :rules="[{ required: true, message: '队伍描述为空' }]"
        />
        <van-field
          v-model="updateTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="队伍过期时间"
          :placeholder="formatTime(updateTeamData.expireTime)|| '点击选择过期时间'"
          @click="showPicker = true"
        />
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="updateTeamData.maxNum" max="10" min="3" />
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="updateTeamData.status == 2"
          v-model="updateTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" title="请选择过期时间" :min-date="minDate">
          </van-date-picker>
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style></style>
