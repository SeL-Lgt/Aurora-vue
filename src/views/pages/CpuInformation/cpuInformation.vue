<template>
  <div id="cpuInformation">
    <el-card v-for="(item,index) in imgUrl" :key="index" >
      <el-image :src="item" fit="cover" style="height: 10%"></el-image>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "cpuInformation",
    data() {
      return {
        imgBase64: [],
        imgUrl: []
      }
    },
    created() {
      this.imgShow();
    },
    methods: {
      imgShow() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionFourImgBase64").then(res => {
          if (res) {
            this.imgBase64 = res;
            for (let i in this.imgBase64) {
              this.imgUrl.push('data:image/png;base64,' + this.imgBase64[i]);
            }
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
