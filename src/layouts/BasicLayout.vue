<template>
  <div class="content">
    <router-view />
  </div>
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
import Header from "../components/Header.vue";
const active = ref(0);
</script>

<style>
.content {
  /* flex: 1; */
  padding-bottom: 100px;
}
</style>
