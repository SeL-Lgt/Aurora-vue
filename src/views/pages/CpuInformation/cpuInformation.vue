<template>
  <div id="cpuInformation">
    <el-card v-loading="loading" element-loading-text="数据正在请求中" element-loading-spinner="el-icon-loading"
             element-loading-background="#fff">
      <el-radio-group v-model="card">
        <el-radio-button v-for="(item,index) in imgBase64"
                         :key="index"
                         :label="index"
                         type="primary"
                         style="margin-bottom: 20px;"
        >
          {{item.title}}
        </el-radio-button>
      </el-radio-group>

      <template v-if="card!=null">
        <el-image :src="imgUrl[card]" fit="cover" style="width: 90%"></el-image>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "cpuInformation",
    data() {
      return {
        loading: true,
        imgBase64: [],
        imgUrl: [],
        card: null
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
              this.imgUrl.push('data:image/png;base64,' + this.imgBase64[i].base64);
            }
            this.card = 0;
            this.loading = false;
          }
        })
      },

      imgCard(val) {
        console.log(val);
        this.card = val;
      }

    }
  }
</script>

<style scoped>

</style>
