<template>
  <!-- <van-card
    class="card"
    v-for="(user, index) in userList"
    :key="index"
    :desc="user.profile"
    :title="user.username"
    :thumb="user.avatarUrl"
    :tag="user.planeCode"
  >
    <template #tags>
      <van-tag
        plain
        type="primary"
        v-for="(tag, index) in user.tags"
        :key="index"
        style="margin-right: 8px"
      >
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">关注</van-button>
      <van-button size="mini">聊天</van-button>
    </template>
  </van-card> -->
  <van-skeleton
    title
    avatar
    :row="3"
    :loading="props.loading"
    v-for="(user, index) in props.userList"
    :key="index"
  >
    <van-card
      :desc="user.profile"
      :title="`${user.username}(${user.planetCode})`"
      :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(tag, index) in user.tags"
          style="margin-right: 8px; margin-top: 8px"
          :key="index"
        >
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import { UserType } from "../models/user";

// interface UserCardListProps {
//   userList: UserType[];
// }
// const props = withDefaults(defineProps<UserCardListProps>(), {
//   //@ts-ignore
//   userList: [],
// });
interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});
</script>

<style>
.card {
  border-radius: 20px;
  margin: 20px;
}
</style>
