<template>
  <div id="teamCard">
    <van-card
      v-for="(team, index) in teamList"
      :thumb="cocoa"
      :desc="team.description"
      :title="`${team.name}`"
      :key="index"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ "过期时间: " + team.expireTime }}
        </div>
        <div>
          {{ "创建时间: " + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button
          size="small"
          type="primary"
          v-if="team.userId !== currentUser?.id && !team.hasJoin"
          plain
          @click="preJoinTeam(team)"
        >
          加入队伍
        </van-button>
        <van-button
          v-if="team.userId === currentUser?.id"
          size="small"
          plain
          @click="doUpdateTeam(team.id)"
          >更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button
          v-if="team.userId !== currentUser?.id && team.hasJoin"
          size="small"
          plain
          @click="doQuitTeam(team.id)"
          >退出队伍
        </van-button>
        <van-button
          v-if="team.userId === currentUser?.id"
          size="small"
          type="danger"
          plain
          @click="doDeleteTeam(team.id)"
          >解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog
      v-model:show="showPasswordDialog"
      title="请输入密码"
      show-cancel-button
      @confirm="doJoinTeam"
      @cancel="doJoinCancel"
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>

<script setup>
import { teamStatusEnum } from "../constants/team";
import cocoa from "../assets/cocoa.png";
import myAxios from "../plugins/myAsios";
import { Dialog, showFailToast, showSuccessToast } from "vant";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../service/user";
import { useRouter } from "vue-router";

const showPasswordDialog = ref(false);
const password = ref("");
const joinTeamId = ref(0);
const currentUser = ref();
const router = useRouter();
const props = defineProps({
  teamList: {},
});
onMounted(async () => {
  currentUser.value = await getCurrentUser();
});

const preJoinTeam = (team) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
};

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = "";
};

/**

 * 加入队伍
   */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0) {
    showSuccessToast("加入成功");
    doJoinCancel();
  } else {
    showFailToast("加入失败" + (res.description ? `,${res.description}` : ""));
  }
};

/**

 * 跳转至更新队伍页
 * @param id
   */
const doUpdateTeam = (id) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    },
  });
};

/**

 * 退出队伍
 * @param id
   */
const doQuitTeam = async (id) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id,
  });
  if (res?.code === 0) {
    showSuccessToast("操作成功");
  } else {
    showFailToast("操作失败" + (res.description ? `,${res.description}` : ""));
  }
};

/**

 * 解散队伍
 * @param id
   */
const doDeleteTeam = async (id) => {
  const res = await myAxios.post("/team/delete", {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast("操作成功");
  } else {
    showFailToast("操作失败" + (res.description ? `,${res.description}` : ""));
  }
};
</script>

<style scoped>
#teamCard :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
