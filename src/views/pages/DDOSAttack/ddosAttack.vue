<template>
  <div id="ddosAttack">
    <el-card>
      <el-row style="text-align: center;margin-bottom: 20px">
        <el-col :span="8" style="transform: translateY(50%)">
          <el-row>
            <p style="color:#0097D3;font-size:20px;font-weight: 700;font-family:'Helvetica Neue'">
              DDOS防护
            </p>
          </el-row>
          <el-row>
            <el-switch
                v-model="status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启DDOS防护"
                inactive-text="关闭DDOS防护"
                @change="getDDOS(),Open()"
            >
            </el-switch>
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-card style="color: #909399;background: #f4f4f5">
            <h3>DDOS攻击级别</h3>
            <el-row>5G/s-10G/s属于警报级别</el-row>
            <el-row>10G/s-30G/s属于危险级别</el-row>
            <el-row>30G/s以上属于高危险级别</el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" max-height="500"
                empty-text="开启DDOS防护后，每隔一分钟会返回一次数据"
      >
        <template v-for="(item,index) in tableListName">
          <el-table-column type="expand"
                           v-if="item.key=='intoerror'"
                           :key="index"
                           prop="intoerror"

          >
            <template slot-scope="scope">
              <el-table :data="scope.row.intoerror" style="width: 100%">
                <template v-for="(itemTwo,indexTwo) in intoErrorListName">
                  <el-table-column
                      :key="indexTwo"
                      :label="itemTwo.title"
                      :prop="itemTwo.key"
                  >
                  </el-table-column>
                </template>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column
              :key="index"
              :label="item.title"
              :prop="item.key"
              v-if="item.key!='intoerror'"
              align="center"
          >
          </el-table-column>

        </template>


      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "ddosAttack",
    data() {
      return {
        status: false,
        tableListName: [
          {
            title: 'intoerror',
            key: 'intoerror'
          },
          {
            title: 'id',
            key: 'id'
          }, {
            title: '时间',
            key: 'time'
          }, {
            title: '等级',
            key: 'grade'
          }],
        intoErrorListName: [
          {
            title: '日志编号',
            key: 'id'
          }, {
            title: 'order',
            key: 'order'
          }, {
            title: 'rate',
            key: 'rate'
          }, {
            title: 'name',
            key: 'name'
          }, {
            title: 'news',
            key: 'news'
          }, {
            title: 'operation',
            key: 'operation'
          }],
        tableData: [],
      }
    },
    methods: {
      Open() {
        let timer = setInterval(() => {
          if (this.status == true) {
            console.log("2");
            this.getDDOS();
          } else
            this.fun(timer);
        }, 60000)
      },
      fun(timer) {
        setTimeout(() => {
          clearInterval(timer)
        }, 0)
      },
      getDDOS() {
        if (this.status == true) {
          this.$api.axiosGetJson("/RestconfApiDataFunctionThree").then(res => {
            console.log("1");
            console.log(res);
            this.tableData = res;
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
