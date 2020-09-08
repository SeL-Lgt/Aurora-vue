<template>
  <div id="cpuInformation">
    <!--    <el-card v-loading="loading" element-loading-text="数据正在请求中" element-loading-spinner="el-icon-loading"-->
    <!--             element-loading-background="#fff">-->
    <!--      <el-radio-group v-model="card">-->
    <!--        <el-radio-button v-for="(item,index) in imgBase64"-->
    <!--                         :key="index"-->
    <!--                         :label="index"-->
    <!--                         type="primary"-->
    <!--                         style="margin-bottom: 20px;"-->
    <!--        >-->
    <!--          {{item.title}}-->
    <!--        </el-radio-button>-->
    <!--      </el-radio-group>-->


    <!--      <template v-if="card!=null">-->
    <!--        <el-image :src="imgUrl[card]" fit="cover" style="width: 90%"></el-image>-->
    <!--      </template>-->
    <!--    </el-card>-->
    <el-card ref="chart">
      <el-row>
        <el-col :span="11">
          <el-row id="cpuInformationMain" style="width: 100%;height: 50vh;"></el-row>
        </el-col>
        <el-col :span="11">
          <el-row id="cpuInformationMain2" style="width: 100%;height: 50vh;"></el-row>

        </el-col>
      </el-row>
      <el-button @click="imgShow2">点击</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "cpuInformation",
    data() {
      return {
        // loading: true,
        imgBase64: [],
        imgUrl: [],
        imgInformation: [
          {
            id: 1,
            name: "Usage times of CPU",
            data: [
              {
                value: 28604960,
                name: "L2 LISP Punt Process"
              },
              {
                value: 14368456,
                name: "IPAM Manager"
              },
              {
                value: 14368456,
                name: "IP ARP Retry Ager"
              },
              {
                value: 7216416,
                name: "MMA DB TIMER"
              },
              {
                value: 7216399,
                name: "VRRS Main thread"
              },
              {
                value: 4619712,
                name: "100ms check"
              },
              {
                value: 3604808,
                name: "Tunnel BGP"
              },
              {
                value: 2308043,
                name: "ONEP Network Element Process "
              },
              {
                value: 1804576,
                name: "SSS Feature Timer"
              },
              {
                value: 923787,
                name: "SBC main process"
              },
              {
                value: 902015,
                name: "Inspect process"
              },
              {
                value: 902015,
                name: "TLSCLIENT_PROCESS"
              },
              {
                value: 902015,
                name: "Timer Library"
              },
              {
                value: 491155,
                name: "IOSD ipc task"
              },
              {
                value: 481839,
                name: "ARP Background"
              },
              {
                value: 477326,
                name: "Crypto IKEv2"
              },
              {
                value: 463436,
                name: "DHCP Client"
              },
              {
                value: 461978,
                name: "Per-Second Jobs"
              },
              {
                value: 461973,
                name: "RSCMSM VOLUME MON"
              },
              {
                value: 461972,
                name: "GraphIt"
              },
              {
                value: 461909,
                name: "REDUNDANCY peer monitor"
              },
              {
                value: 461906,
                name: "Environmental Monitoring"
              },
              {
                value: 461906,
                name: "RP HA Periodic"
              },
              {
                value: 461903,
                name: "mDNS"
              },
              {
                value: 461903,
                name: "cdp init process"
              }
            ]
          },
          {
            id: 2,
            name: "Average CPU usage time",
            data: [
              {
                value: 31500,
                name: "CWAN OIR Handler"
              },
              {
                value: 9333,
                name: "CTS CORE"
              },
              {
                value: 7000,
                name: "PrstVbl"
              },
              {
                value: 5169,
                name: "TPS IPC Process"
              },
              {
                value: 5166,
                name: "ACE HAPI"
              },
              {
                value: 4891,
                name: "Check heaps"
              },
              {
                value: 3000,
                name: "DHCPD Receive"
              },
              {
                value: 2852,
                name: "DCM snmp dp Thread"
              },
              {
                value: 2615,
                name: "Per-minute Jobs"
              },
              {
                value: 2417,
                name: "ONEP CLI Command Server"
              },
              {
                value: 2000,
                name: "CEF RP Background"
              },
              {
                value: 2000,
                name: "MCPRP RG Timer"
              },
              {
                value: 1707,
                name: "HTTP CORE"
              },
              {
                value: 1666,
                name: "RF Slave Main Thread"
              },
              {
                value: 1666,
                name: "Entity MIB API"
              },
              {
                value: 1000,
                name: "SAStorage"
              },
              {
                value: 1000,
                name: "SXP CORE"
              },
              {
                value: 1000,
                name: "SBC initializer"
              },
              {
                value: 1000,
                name: "AN"
              },
              {
                value: 1000,
                name: "DHCP SIP"
              },
              {
                value: 1000,
                name: "FLEX DSPRM MAIN"
              },
              {
                value: 1000,
                name: "crypto engine proc"
              },
              {
                value: 1000,
                name: "QOS_MODULE_MAIN"
              },
              {
                value: 1000,
                name: "EEM ED Generic"
              },
              {
                value: 1000,
                name: "Call Home DS"
              }
            ]
          },
          {
            id: 3,
            name: "CPU usage in five seconds",
            data: [
              {
                value: 0.15,
                name: "Check heaps"
              }
            ]
          },
          {
            id: 4,
            name: "CPU usage per minute",
            data: [
              {
                value: 0.07,
                name: "Check heaps"
              },
              {
                value: 0.01,
                name: "IOSD ipc task"
              }
            ]
          },
          {
            id: 5,
            name: "CPU usage in five minutes",
            data: [
              {
                value: 0.06,
                name: "TPS IPC Process"
              },
              {
                value: 0.05,
                name: "Check heaps"
              }
            ]
          }
        ],
        card: null
      }
    },
    created() {

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
      imgShow2() {
        var cpuInformationMain = document.getElementById("cpuInformationMain");
        var cpuInformationMain2 = document.getElementById("cpuInformationMain2");
        let myChart = this.$echarts.init(cpuInformationMain);
        let myChart2 = this.$echarts.init(cpuInformationMain2);
        console.log(this.$refs.chart)
        // 绘制图表
        var item1 = {
          color: '#F54F4A'
        };
        var item2 = {
          color: '#FF8C75'
        };
        var item3 = {
          color: '#FFB499'
        };

        var data = [
          {
            children: [{
              value: 5,
              children: [{
                value: 1,
                itemStyle: item1
              }, {
                value: 2,
                children: [{
                  value: 1,
                  itemStyle: item2
                }]
              }, {
                children: [{
                  value: 1
                }]
              }],
              itemStyle: item1
            }, {
              value: 10,
              children: [{
                value: 6,
                children: [{
                  value: 1,
                  itemStyle: item1
                }, {
                  value: 1
                }, {
                  value: 1,
                  itemStyle: item2
                }, {
                  value: 1
                }],
                itemStyle: item3
              }, {
                value: 2,
                children: [{
                  value: 1
                }],
                itemStyle: item3
              }, {
                children: [{
                  value: 1,
                  itemStyle: item2
                }]
              }],
              itemStyle: item1
            }],
            itemStyle: item1
          }, {
            value: 9,
            children: [{
              value: 4,
              children: [{
                value: 2,
                itemStyle: item2
              }, {
                children: [{
                  value: 1,
                  itemStyle: item1
                }]
              }],
              itemStyle: item1
            }, {
              children: [{
                value: 3,
                children: [{
                  value: 1
                }, {
                  value: 1,
                  itemStyle: item2
                }]
              }],
              itemStyle: item3
            }],
            itemStyle: item2
          }, {
            value: 7,
            children: [{
              children: [{
                value: 1,
                itemStyle: item3
              }, {
                value: 3,
                children: [{
                  value: 1,
                  itemStyle: item2
                }, {
                  value: 1
                }],
                itemStyle: item2
              }, {
                value: 2,
                children: [{
                  value: 1
                }, {
                  value: 1,
                  itemStyle: item1
                }],
                itemStyle: item1
              }],
              itemStyle: item3
            }],
            itemStyle: item1
          }, {
            children: [{
              value: 6,
              children: [{
                value: 1,
                itemStyle: item2
              }, {
                value: 2,
                children: [{
                  value: 2,
                  itemStyle: item2
                }],
                itemStyle: item1
              }, {
                value: 1,
                itemStyle: item3
              }],
              itemStyle: item3
            }, {
              value: 3,
              children: [{
                value: 1,
              }, {
                children: [{
                  value: 1,
                  itemStyle: item2
                }]
              }, {
                value: 1
              }],
              itemStyle: item3
            }],
            itemStyle: item1
          }];

        var option = {
          series: {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: null,
            highlightPolicy: 'ancestor',
            data: data,
            label: {
              rotate: 'radial'
            },
            levels: [],
            itemStyle: {
              color: '#ddd',
              borderWidth: 2
            }
          }
        };

        myChart.setOption(option);
        myChart2.setOption(option);
      },
      imgCard(val) {
        console.log(val);
        this.card = val;
      }
    },
    mounted() {
      this.imgShow2();
    }
  }
</script>

<style scoped>

</style>
