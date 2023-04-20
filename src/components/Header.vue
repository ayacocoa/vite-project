<template>
  <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <!-- <router-view /> -->
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};
const title = "";
</script>

<style></style>
