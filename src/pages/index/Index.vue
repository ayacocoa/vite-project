<template>
  <Header title="首页" />
  <van-cell center title="推荐模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <UserCard :userList="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import myAxios from "../../plugins/myAsios";
import { showFailToast, Toast } from "vant";
//@ts-ignore
import UserCard from "../../components/UserCard.vue";
import { UserType } from "../../models/user";

const isMatchMode = ref<boolean>(false);

const userList = ref();
const loading = ref(true);

/**

 * 加载数据
   */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 推荐模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios
      .get("/user/match", {
        params: {
          num,
        },
      })

      .then(function (response) {
        console.log("/user/match succeed", response);
        return response?.data;
      })
      .catch(function (error) {
        console.error("/user/match error", error);
        showFailToast("请求失败");
      });
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios
      .get("/user/recommend", {
        params: {
          pageSize: 8,
          pageNum: 1,
        },
      })
      .then(function (response) {
        return response?.data?.records;
      })
      .catch(function (error) {
        showFailToast("请求失败");
      });
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        //@ts-ignore
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped></style>
