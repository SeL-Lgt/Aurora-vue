<template>
  <div id="home">
    <vHeader></vHeader>
    <el-container>
      <el-aside width="200px">
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

</style>
