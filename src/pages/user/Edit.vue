<template>
  <Header :title="editUser.editName" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="editUser.currentValue"
        :name="editUser.currentKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{ required: true, message: '不能为空' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import myAxios from "../../plugins/myAsios";
import { getCurrentUser } from "../../service/user";
import { showSuccessToast, showFailToast } from "vant";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

const username = ref("");
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  // console.log(currentUser);
  if (!currentUser) return;
  const res = await myAxios.post("/user/update", {
    id: currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue,
  });
  // console.log(res);
  if (res.code === 0 && res.data) {
    router.back();
  } else {
    showFailToast("修改失败");
  }
};
</script>

<style></style>
