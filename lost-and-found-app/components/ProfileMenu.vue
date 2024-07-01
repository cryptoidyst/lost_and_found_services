<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="basicInfoRoute"
  >
    <el-menu-item index="1">Basic Info</el-menu-item>
    <el-submenu index="2">
      <template slot="title">History</template>
      <el-menu-item index="2-1" @click="myReportHistoryRoute"
        >Report History</el-menu-item
      >
      <el-menu-item index="2-2">Claim History</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" @click="logoutUser" class="logout-nav"
      >Logout</el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    basicInfoRoute(key, keyPath) {
      this.$router.push(`/profile`);
    },
    myReportHistoryRoute(key, keyPath) {
      this.$router.push(`/report/my-report`);
    },
    async logoutUser() {
      try {
        await this.$cookies.remove("token");
        await this.$cookies.remove("user");
        this.$notify.success({
          title: "Success",
          message: "Logout successful",
        });
        this.$router.push(`/login`);
      } catch (error) {
        this.$notify.error({
          title: "Error",
          message: error.response?.data.message || "Logout failed",
        });
      }
    },
  },
};
</script>

<style>
.logout-nav {
  right: 0;
  position: absolute;
  color: red;
}
</style>
