<template>
  <UserCard :userList="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="暂无" />
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import myAxios from "../../plugins/myAsios";
import qs from "qs";
import UserCard from "../../components/UserCard.vue";

const route = useRoute();
const { tags } = route.query;
const userList = ref();
onMounted(async () => {
  const userListData = await myAxios
    .get("/user/search/tags", {
      params: {
        tagNameList: tags,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false }); //序列化
      },
    })

    .then(function (response) {
      // 处理成功情况
      console.log("/user/search/tags succeed", response);
      return response.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    });

  console.log(userListData);

  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
});

const mockUser = {
  id: 124554,
  username: "cocoa",
  userAccount: "akacoco",
  avatarUrl: "src\\assets\\cocoa.png",
  profile: "hello world",
  gender: 0,
  phone: "12354458989",
  email: "147258@xxx.com",
  userStatus: "number",
  planeCode: "19711",
  tags: ["java", "emo"],
  createTime: new Date(),
};
</script>

<style></style>
