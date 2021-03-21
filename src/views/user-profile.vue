<template>
  <section class="user-profile-main-container flex">
    <app-header />
    <div class="profile-container">
      <div class="top">
        <el-avatar
          v-if="loggedInUser"
          class="usr-profile-avatar"
          size="large"
          :src="loggedInUser.imgUrl"
          >{{ checkLoggedUser }}</el-avatar
        >
        <el-avatar v-else class="usr-profile-avatar" size="large">G</el-avatar>
        <h1 :checkLoggedUser="checkLoggedUser">{{ checkLoggedUser }}</h1>
      </div>
      <div class="bottom">
        <div class="user-boards">
          <h2>My boards</h2>
          <h3>Board 1</h3>
          <h3>Board 2</h3>
          <h3>Board 3</h3>
        </div>
        <div class="user-tasks">
          <h2>My Tasks</h2>
          <h3>Task 1</h3>
          <h3>Task 2</h3>
          <h3>Task 3</h3>
        </div>
        <div class="user-details">
          <el-avatar
            v-if="loggedInUser"
            class="usr-profile-avatar"
            size="large"
            :src="loggedInUser.imgUrl"
            >{{ checkLoggedUser }}</el-avatar
          >
          <el-avatar v-else class="usr-profile-avatar" size="large"
            >G</el-avatar
          >
          <div class="user-details-username flex">
            <!-- <el-icon-user-solid> <h3>Username: {{loggedInUser.username}}</h3></el-icon-user-solid> -->
            <i class="el-icon-user-solid"></i>
            <h3><span>username:</span> guestus</h3>
          </div>
          <div class="user-details-email flex">
            <!-- <el-icon-message> <h3>email: guestus@gmail.com</h3></el-icon-message> -->
            <i class="el-icon-message"></i>
            <h3><span>email:</span> guestus@gmail.com</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "../cmps/app-header.vue";

export default {
  components: { appHeader },
  name: "user-profile",
  data() {
    return {
      loggedInUser: null,
    };
  },
  computed: {
    checkLoggedUser() {
      if (!this.loggedInUser) return "Guest";
      else return this.loggedInUser.fullname;
    },
  },
  created() {
    const user = JSON.parse(this.$store.getters.loggedInUser) || null;
    this.loggedInUser = user || null;
  },
};
</script>

