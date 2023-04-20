<template>
  <router-view />
  <van-tabbar v-model="active" route class="tabbar">
    <van-tabbar-item replace icon="home-o" name="index" to="/index">
    </van-tabbar-item>
    <van-tabbar-item replace icon="friends-o" name="team" to="/team">
    </van-tabbar-item>
    <van-tabbar-item replace icon="manager-o" name="user" to="/user">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
// import { router } from "vue-router";
const active = ref(0);
</script>

<style></style>
