<template>
  <Header></Header>
  <form>
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="Oncancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>

  <van-row>
    <van-col
      v-for="(tag, index) in activeId"
      :key="index"
      gutter="16"
      style="padding: 5px 10px"
    >
      <van-tag
        closeable
        size="medium"
        type="primary"
        @close="close(tag)"
        class="tag"
      >
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="right">选择标签</van-divider>
  <van-tree-select
    v-model:active-id="activeId"
    v-model:main-active-index="activeIndex"
    :items="tagList"
  />
  <div style="padding: 20px">
    <van-button
      type="primary"
      @click="doSearch()"
      block
      style="border-radius: 100px"
      >搜索</van-button
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import { useRouter } from "vue-router";

const originTagList = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" },
    ],
  },
  {
    text: "年级",
    children: [
      { text: "大一", id: "大一" },
      { text: "大二", id: "大二" },
      { text: "大3", id: "大3" },
      { text: "大4", id: "大4" },
      { text: "大5", id: "大5aaaaaaa" },
      { text: "大6", id: "大6aaaaaaa" },
    ],
  },
];
let tagList = ref(originTagList);
// search
const searchText = ref("");
// const onSearch = () => {
//   tagList.value = tagList.value.map((parentTag) => {
//     parentTag.children = parentTag.children.filter((item) => {
//       item.text.includes(searchText.value);
//     });
//   });
// .flatMap((parentTag) => parent.children)
// .filter((item) => {
//   item.text.includes(searchText.value);
// });
// };
const onSearch = (val) => {
  tagList.value = originTagList.map((parentTag) => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter((item) =>
      item.text.includes(searchText.value)
    );
    return tempParentTag;
  });
};

const Oncancel = () => {
  searchText.value = "";
  tagList.value = originTagList;
};

//  tag
const close = (id) => {
  activeId.value = activeId.value.filter((item) => {
    return item !== id;
  });
};

// treeselect
const activeId = ref([]);
const activeIndex = ref(0);

//doSearch
const router = useRouter();
const doSearch = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeId.value,
    },
  });
};
</script>

<style></style>
