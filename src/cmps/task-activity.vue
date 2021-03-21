<template>
  <section class="activity-container">
    <div
      v-for="activity in activities"
      :key="activity.id"
    >
      <div class="activity flex-between">
        <div class="activity-time">{{currentDate | moment("from", "now")}}</div>
        <el-avatar
          class="activity-avatar"
          :src="activity.byMember.imgUrl"
        ></el-avatar>
        <div class="activity-title">{{activity.task.title}}</div>
        <div class="activity-action">{{activity.action}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    activities: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      currentDate: '1616315467737'
    }
  },
  methods: {
    createdAtForDiaplay() {
      // return this.$moment(1616313904857, 'YYYYMMDD').fromNow()
      return this.$moment("1616315467737", "YYYYMMDD").fromNow()
      //    return this.$moment('1616313904857', "YYYYMMDD").fromNow();  
      // return moment(activity.createdAt, "YYYYMMDD").fromNow();
    }
  }
}
</script>