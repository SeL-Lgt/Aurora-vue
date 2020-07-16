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
          ></el-table-column>
        </div>
        <el-table-column align="center" fixed="right" label="操作">
          <template >
            <el-button type="text" @click="drawer=true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer title="编辑信息" :visible.sync="drawer">

    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "interfaceInformation",
    data() {
      return {
        drawer: false,//抽屉
        tableListName: [ {
          title: '接口描述',
          key: 'InterfaceDescription'
        }, {
          title: 'ipv4地址',
          key: 'ipv4address'
        }, {
          title: '子网掩码',
          key: 'SubnetMask'
        }, {
          title: '接口类型',
          key: 'InterfaceType'
        }, {
          title: 'mac地址',
          key: 'macAddress'
        },{
          title: '接口状态',
          key: 'InterfaceStatus'
        }],
        tableData: [{
          InterfaceStatus: 12,
          ipv4address: "192.168.0.1",
          SubnetMask: "255.255.255.0",
          InterfaceType: '接口类型',
          macAddress: '12-F0-05-92-C0-BB',
          InterfaceDescription: '作为xxxxxxxx'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
