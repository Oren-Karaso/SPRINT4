<template>
  <ul
    v-if="task"
    class="members clean-list"
  >
    <li
      v-for="member in task.members.slice(0,2)"
      :key="member._id"
      class="miniUser"
    >
      <el-avatar
        size="small"
        :src="member.imgUrl"
      ></el-avatar>
    </li>
    <el-avatar v-if="restOfMembersAvatar > 0"
      class="rest-of-members-avatar"
      size="small"
    >+{{restOfMembersAvatar}}</el-avatar>
  </ul>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {

    restOfMembersAvatar() {

      return this.task.members.length - 2;
    }
  },

}
</script>

<style>
</style>