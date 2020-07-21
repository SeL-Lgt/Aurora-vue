<template>
  <div id="interfaceInformation">
    <el-card class="box-card">
      <!--
         表格位置
     -->
      <el-table :data="tableData">
        <div v-for="(item,index) in tableListName" :key="index">
          <el-table-column
              :prop="item.key"
              :label="item.title"
              align="center"
              v-if="item.key!=='ip'&&item.key!=='netmask'&&item.key!=='enabled'"
          >
          </el-table-column>
        </div>
        <el-table-column prop="ip" label="ipv4地址" align="center">
          <template slot-scope="scope">
            <div v-for="(itemOne,indexOne) in scope.row.ipv4" :key="indexOne">
              {{itemOne.ip}}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="netmask" label="子网掩码" align="center">
          <template slot-scope="scope">
            <div v-for="(itemOne,indexOne) in scope.row.ipv4" :key="indexOne">
              {{itemOne.netmask}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="接口状态" align="center">
          <template v-once slot-scope="scope">
            <div v-if="scope.row.enabled===true">开启</div>
            <div v-else>关闭</div>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="putInterface(scope.row)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </el-card>

    <el-dialog title="编辑信息" :visible.sync="dialog" width="30%" center>
      <el-form :ref="tempData" :model="tempData" label-width="100px" size="medium">
        <el-form-item label="设备名字" prop="name">
          <el-input v-model="tempData.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="网卡" prop="ipv4">
          <el-select v-model="tempData.ipv6"  placeholder="请选择网卡">
            <el-option v-for="(item,index) in tempData.ipv4" :key="index" :label="'网卡'+JSON.stringify(index+1)" :value="JSON.stringify(index+1)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ipv4地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="子网掩码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="接口状态">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "interfaceInformation",
    data() {
      return {
        dialog: false,//抽屉
        tableListName: [
          {
            title: '接口描述',
            key: 'description'
          }, {
            title: '设备名字',
            key: 'name'
          }, {
            title: 'ipv4地址',
            key: 'ip'
          }, {
            title: '子网掩码',
            key: 'netmask'
          }, {
            title: '接口类型',
            key: 'type'
          }, {
            title: 'mac地址',
            key: 'macAddress'
          }, {
            title: '接口状态',
            key: 'enabled'
          }],
        tableData: [
          {
            name: "1",
            description: "MANAGEMENT INTERFACE - DON'T TOUCH ME",
            enabled: true,
            ipv4: [
              {
                ip: "10.10.20.48",
                netmask: "255.255.255.0"
              },
              {
                ip: "10.10.20.49",
                netmask: "255.255.255.0"
              },
              {
                ip: "10.10.20.50",
                netmask: "255.255.255.0"
              }
            ]
          }, {
            name: "2",
            enabled: false,
            description: "MANAGEMENT INTERFACE - DON'T TOUCH ME",
            ipv4: [
              {
                ip: "10.10.20.70",
                netmask: "255.255.255.2"
              },
              {
                ip: "10.10.20.80",
                netmask: "255.255.255.0"
              },
              {
                ip: "10.10.20.90",
                netmask: "255.255.255.1"
              }
            ]
          }
        ],
        tempData: {
        }
      }
    },
    created() {
      this.getInterface();
    },
    methods: {
      /**
       * 获取
       */
      getInterface() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionOne2").then(res => {
          this.tableData = res;
          console.log(res);
        })
      },
      putInterface(val){
        this.tempData = JSON.parse(JSON.stringify(val));
        console.log(this.tempData.ipv4);
        this.dialog=true;
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    text-align: center;
  }
</style>
