<template>
  <nav class="navbar footer-nav">
    <a class="navbar-brand" href="/home" :class="{ active: $route.path === '/home' }">
      <i class="el-icon-s-home"></i>
    </a>
    <a class="navbar-brand" href="/search" :class="{ active: $route.path === '/search' }">
      <i class="el-icon-search"></i>
    </a>
    <a class="navbar-brand" href="/report" :class="{ active: $route.path === '/report' }">
      <i class="el-icon-plus"></i>
    </a>
    <!-- <a class="navbar-brand" href="#" :class="{ active: $route.path === '/notifications' }">
      <i class="el-icon-bell"></i>
    </a> -->
    <a class="navbar-brand" href="/profile" :class="{ active: $route.path === '/profile' }">
      <i class="el-icon-user-solid"></i>
    </a>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.footer-nav {
  text-align: center;
  justify-content: space-evenly;
  position: relative;
  bottom: 0;
  background-color: #5ae0b3;
}

.footer-nav .navbar-brand {
  color: #ffffff;
}

.footer-nav .active i {
  color: #5d73a4;
}
</style>