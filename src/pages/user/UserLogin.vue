<template>
  <Header title="登录" />
  <div class="onLogin">
    <van-form @submit="onSubmit" class="form">
      <van-cell-group inset>
        <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAsios";
import axios from "axios";
const router = useRouter();

const userAccount = ref("");
const userPassword = ref("");

const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    id: 1,
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  console.log(res);
  if (res.code === 0 && res.data) {
    showSuccessToast("登录成功");
    router.replace("/user");
  } else {
    showFailToast("登录失败");
  }
};
</script>

<style scoped>
.onLogin {
  flex: 1;
  height: 600px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-image: linear-gradient(skyblue, white);
}
</style>
