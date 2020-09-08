<template>
  <div id="topology">
    <!--    <iframe id="topos" :src="url+'/topos'" scroll="no" frameborder="0"-->
    <!--            style="position:relative;overflow: hidden"></iframe>-->
    <div id="htstr" v-html="html">
    </div>
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
    // mounted() {
    //   function changeMobsIframe() {
    //     const topos = document.getElementById('topos');
    //     const windowWidth = window.innerWidth;
    //     const windowHeight = window.innerHeight;
    //     console.log(windowWidth + "高：" + windowHeight)
    //     if (windowHeight < 750) {
    //       console.log(topos);
    //       topos.style.height = 600 + 'px'; //数字是页面布局宽度差值
    //     } else {
    //       topos.style.height = 60 + 'vh'; //数字是页面布局高度差
    //     }
    //     topos.style.width = 85+ 'vw'; //数字是页面布局高度差
    //   }
    //
    //   changeMobsIframe()
    //   window.onresize = function () {
    //     changeMobsIframe()
    //   }
    // },
    created() {
      this.addQuneeJs();
      this.getTopology();
    },
    methods: {
      addQuneeJs(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://demo.qunee.com/lib/qunee-min.js';
        document.body.appendChild(s);
      },
      getTopology() {
        this.$api.axiosPostJson('/topos', {
          height:1000,
          data: [
            {
              "name": "DNAC",
              "coordinate-x": 100,
              "coordinate-y": -50,
              "image": "Q.Graphs.server",
              "size": {
                "width": 30,
                "height": -1
              },
              "type": "Name: DNA-Center Controller",
              "ipaddress": null,
              "hostname": null,
              "macAddress": null,
              "edge": null
            },
            {
              "name": "C3850_A",
              "coordinate-x": 100,
              "coordinate-y": 160,
              "image": "http://demo.qunee.com/editor/data/cisco/multilayerSwitch.png",
              "size": {
                "width": 50,
                "height": -1
              },
              "ipaddress": "10.10.20.85",
              "hostname": "spine1.abc.inc",
              "macAddress": "70:01:b5:5d:1b:00",
              "type": "Type: Cisco Catalyst38xx stack-able ethernet switch",
              "edge": {
                "start": "DNAC",
                "end": "C3850_A"
              }
            }
          ]
        }).then(res => {
          this.html = res;
          this.$nextTick(() => {
            console.log(1)
            let htstr = document.getElementById("htstr");
            let script = document.getElementById("canvas").getElementsByTagName("script");
            for (let i = 0; i < script.length; i++) {
              console.log(script[i]);
              let ele = document.createElement("script");
              if (script[i].src) ele.src = script[i].src;
              if (script[i].innerHTML) ele.innerHTML = script[i].innerHTML;
              htstr.appendChild(ele);
            }
          })
          console.log(this.html);
          this.html = res;
        })

      },

    }
  }
</script>

<style scoped>

</style>
