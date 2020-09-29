<template>
  <div id="cpuInformation">
    <el-row v-for="(item,index) in ciscoData" :key="index" style="margin-bottom: 20px">
      <el-card>
        <el-row>
          <h1 align="center" style="transform: translateX(-5vw);">{{item.category}}</h1>
          <el-col :span="12">
            <div :name="item.category">
              <div name="round" style="width: 100%;height: 25vh"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div :name="item.category">
              <div name="barChart" style="width: 100%;height: 25vh"></div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "cpuInformation",
    data() {
      return {
        ciscoData: [],
      }
    },
    created() {
      this.getCiscoData();
    },
    updated() {
      this.createRound();
    },
    methods: {
      getCiscoData() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionThree").then(res => {
          console.log(res.CiscoData);
          this.ciscoData = res.CiscoData;
          this.createRound();
        })
      },
      createRound() {
        for (let Data in this.ciscoData) {
          let round = document.getElementsByName(this.ciscoData[Data].category)[0].getElementsByTagName("div")[0];
          let barChart = document.getElementsByName(this.ciscoData[Data].category)[1].getElementsByTagName("div")[0];
          let myRound = this.$echarts.init(round);
          let myBarChart = this.$echarts.init(barChart);

          var optionRound = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            aria: {
              show: true
            },
            legend: {
              orient: 'vertical',
              left: 0,
              data: ['良好', '错误', '公平', '卸载']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '70%',
                center: ['50%', '60%'],
                data: [
                  {value: this.ciscoData[Data].goodPercentage, name: '良好'},
                  {value: this.ciscoData[Data].badPercentage, name: '错误'},
                  {value: this.ciscoData[Data].fairPercentage, name: '公平'},
                  {value: this.ciscoData[Data].unmonPercentage, name: '卸载'}
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };

          var optionBarChart = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              data: ['良好', '错误', '公平', '卸载']
            },
            yAxis: {
              type: 'value'
            },
            grid:{
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            series: [{
              barWidth: '60%',
              data: [this.ciscoData[Data].goodCount, this.ciscoData[Data].badCount,
                this.ciscoData[Data].fairCount, this.ciscoData[Data].unmonCount],
              type: 'bar',
              showBackground: true
            }]
          }
          myRound.setOption(optionRound);
          myBarChart.setOption(optionBarChart);
        }

      }
    }
  }
</script>

<style scoped>

</style>
