<template>
  <div id="home" style="height:100%">
    <vHeader></vHeader>
    <el-container style="height:100%">

      <el-aside width="200px" style="height:100%">
        <vSidebar></vSidebar>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </div>
</template>


<script>
  import vHeader from './header';
  import vSidebar from './sidebar';

  export default {
    name: "home",
    data() {
      return {};
    },
    components: {
      vHeader,
      vSidebar
    }
  }
</script>

<style scoped>
  .el-aside {
    position: relative;
    height: 93vh;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

  }
</style>
