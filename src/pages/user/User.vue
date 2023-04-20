<template>
  <template v-if="user">
    <Header title="个人中心" />
    <van-cell :title="user.username" is-link>
      <img
        style="height: 46px; width: 46px; border-radius: 23px"
        :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell title="修改信息" is-link to="/user/update" />

    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>

  <div class="login">
    <van-button type="primary" @click="toLogin">登录</van-button>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import Footer from "../../components/Footer.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, nextTick, onDeactivated } from "vue";
import myAxios from "../../plugins/myAsios";
import { getCurrentUser } from "../../service/user";
// const user = {
//   id: 1,
//   username: "cocoa",
//   userAccount: "akacoco",
//   avatarUrl: "src\\assets\\cocoa.png",
//   gender: "男",
//   phone: "123456789",
//   email: "1234567@xxx.com",
//   planeCode: "19711",
//   createTime: new Date(),
// };
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
const toLogin = () => {
  router.push("/user/login");
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
