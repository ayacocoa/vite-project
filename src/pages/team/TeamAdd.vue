<template>
  <Header title="创建队伍" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="addTeamData.name"
        name="name"
        label="队伍名"
        placeholder="请输入队伍名"
        :rules="[{ required: true, message: '请输入队伍名' }]"
      />
      <van-field
        v-model="addTeamData.description"
        rows="4"
        autosize
        label="队伍描述"
        type="textarea"
        placeholder="请输入队伍描述"
      />
      <van-field
        v-model="result"
        is-link
        readonly
        name="datePicker"
        label="截止时间"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :min-date="minDate"
        />
      </van-popup>
      <van-field name="stepper" label="人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="10" min="2" />
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="Number(addTeamData.status) === 2"
        v-model="addTeamData.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入队伍密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import myAxios from "../../plugins/myAsios";
import { showSuccessToast, showFailToast } from "vant";
const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const result = ref("");
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join("-");
  showPicker.value = false;
};
const initFormData = {
  name: "",
  description: "",
  expireTime: result,
  maxNum: 2,
  password: "",
  status: 0,
};
// 需要用户填写的表单数据
const addTeamData = ref({ ...initFormData });

// 提交

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  };
  //
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("添加成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("添加失败");
  }
};
</script>

<style></style>
