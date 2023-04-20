<template>
  <template v-if="user">
    <Header title="更新信息" />
    <van-cell
      title="头像"
      is-link
      to="/user/edit"
      @click="toEdit('avatarUrl', '头像', user.avatarUrl)"
    >
      <img
        style="height: 46px; width: 46px; border-radius: 23px"
        :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.username"
      to="/user/edit"
      @click="toEdit('username', '昵称', user.username)"
    />
    <van-cell
      title="账号"
      is-link
      :value="user.userAccount"
      to="/user/edit"
      @click="toEdit('userAccount', '账号', user.userAccount)"
    />

    <van-cell
      title="性别"
      is-link
      :value="user.gender"
      @click="toEdit('gender', '性别', user.gender)"
    />
    <van-cell
      title="电话"
      is-link
      :value="user.phone"
      to="/user/edit"
      @click="toEdit('phone', '电话', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      :value="user.email"
      to="/user/edit"
      @click="toEdit('email', '邮箱', user.email)"
    />
    <van-cell title="编号" is-link :value="user.planeCode" />
    <van-cell title="注册时间" is-link :value="user.createTime" />
  </template>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import Footer from "../../components/Footer.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, nextTick, onDeactivated } from "vue";
import myAxios from "../../plugins/myAsios";
import { getCurrentUser } from "../../service/user";

const user = ref({});
const router = useRouter();

onMounted(async () => {
  // await nextTick();
  user.value = await getCurrentUser();
  // console.log(res);
  // judge();
});

const toEdit = (editKey, editName, currentValue) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  });
};

// let gender = ref();
// function judge() {
//   if (user.gender === 0) {
//     gender = "女";
//   } else {
//     gender = "男";
//   }
// }
</script>

<style>
.login {
  display: flex;
  justify-content: right;
  margin: 50px 20px;
}
</style>
