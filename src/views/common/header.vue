<template>
  <!--折叠按钮-->
  <div id="m-header">
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <el-row>
      <el-col :span="19">
        基于Restconf协议的自动化管理CSR1kv系统
      </el-col>
      <el-col :offset="3" :span="1">
        <el-button type="text" @click="officeExit">
          <i style="font-size: 22px;color: white" class="el-icon-switch-button"></i>
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    name: "m-header",
    data() {
      return {
        fullscreen: false,
        collapse: false
      };
    },
    methods: {
      collapseChange() {
        this.collapse = !this.collapse;
      },
      officeExit(){
        this.$message({message: "退出成功", type: "success"});
        this.$router.push({name:'login'});
      }
    }
  }
</script>

<style scoped>
  #m-header {
    position: relative;
    width: 100%;
    height: 70px;
    font-size: 22px;
    padding: 0 20px;
    color: #fff;
    line-height: 70px;

  }

  .collapse-btn {
    float: left;
    padding-right: 20px;
  }

</style>
