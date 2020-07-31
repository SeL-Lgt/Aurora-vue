<template>
  <div id="cpuInformation">
    <el-card>
      <template v-if="imgBase64[0]==null">
        <p>数据正在请求中请等待</p>
      </template>
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
        <el-image :src="imgUrl[card]" fit="cover"></el-image>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "cpuInformation",
    data() {
      return {
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
