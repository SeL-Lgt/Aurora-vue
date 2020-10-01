<template>
  <div id="topology">
    <el-card>
      <iframe id="topos" :src="url+'/topos'" scroll="no" frameborder="0"
              style="position:relative;overflow: hidden"></iframe>
    </el-card>
    <!--    <el-card>-->
    <!--      <div id="htstr" v-html="html">-->
    <!--      </div>-->
    <!--    </el-card>-->
    <!--    <div  v-html="html2" ></div>-->
  </div>
</template>


<script>
  export default {
    inject: ['reload'],
    name: "topology",
    data() {
      return {
        url: this.$api.url,
        html: "",
        html2: "",
        regJs: "",
        num: 0,
        loading: true
      }
    },
    mounted() {
      function changeMobsIframe() {
        const topos = document.getElementById('topos');
        const windowHeight = window.innerHeight;
        if (windowHeight < 750) {
          topos.style.height = 600 + 'px'; //数字是页面布局宽度差值
        } else {
          topos.style.height = 60 + 'vh'; //数字是页面布局高度差
        }
        topos.style.width = 85 + 'vw'; //数字是页面布局高度差
      }

      changeMobsIframe()
      window.onresize = function () {
        changeMobsIframe()
      }
    },
    created() {
      // this.getTopology();
    },
    methods: {
      // getTopology() {
      //   this.$api.axiosGetJson('/topos').then(res => {
      //     this.html = res;
      //     this.$nextTick(() => {
      //       console.log(1)
      //       let htstr = document.getElementById("htstr");
      //       let script = document.getElementById("canvas").getElementsByTagName("script");
      //       for (let i = 0; i < script.length; i++) {
      //         console.log(script[i]);
      //         let ele = document.createElement("script");
      //         if (script[i].src) ele.src = script[i].src;
      //         if (script[i].innerHTML) ele.innerHTML = script[i].innerHTML;
      //         htstr.appendChild(ele);
      //       }
      //     })
      //     console.log(this.html);
      //     this.html = res;
      //   })

      // },

    }
  }
</script>

<style scoped>

</style>
