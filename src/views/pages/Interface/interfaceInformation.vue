<template>
  <div id="interfaceInformation">
    <el-card class="box-card">
      <!--
         表格位置
     -->
      <el-table :data="tableData" v-loading="loading" element-loading-text="正在获取数据"
                element-loading-spinner="el-icon-loading">
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
            <el-button type="text" @click="dialogShow(scope.row)" :disabled="scope.row.name=='GigabitEthernet1'">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <el-dialog title="编辑信息" :visible.sync="dialog" width="30%" center>
      <el-form :ref="tempData" :model="tempData" label-width="100px" size="medium">
        <el-form-item label="接口名字" prop="name">
          <el-input v-model="tempData.name" disabled></el-input>
        </el-form-item>
        <div v-for="(itemOne,indexOne) in tempData.ipv4" :key="indexOne">
          <el-form-item label="ipv4地址" :prop="`ipv4[${indexOne}].ip`">
            <el-input v-model="tempData.ipv4[indexOne].ip" placeholder="请按照这种格式:1.1.1.1"></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" :prop="`ipv4[${indexOne}].netmask`">
            <el-input v-model="tempData.ipv4[indexOne].netmask" placeholder="请按照这种格式:255.255.255.0"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="接口状态" prop="enabled">
          <el-switch
              v-model="tempData.enabled"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="接口描述" prop="description">
          <el-input v-model="tempData.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postInterface">修改</el-button>
          <el-button @click="resetForm(tempData)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "interfaceInformation",
    data() {
      return {
        loading: true,
        alertType: null,
        dialog: false,//抽屉
        tableListName: [
          {
            title: '接口描述',
            key: 'description'
          }, {
            title: '接口名字',
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
            title: '接口状态',
            key: 'enabled'
          }],
        tableData: [],
        tempData: {}
      }
    },
    created() {
      this.getInterface();
    },
    methods: {
      /**
       * 显示编辑页
       */
      dialogShow(val) {
        this.tempData = JSON.parse(JSON.stringify(val));
        this.dialog = true;
        if (this.tempData.ipv4 === null) {
          this.tempData.ipv4 = new Array();
          this.tempData.ipv4.push({'ip': null, 'netmask': null});
          console.log(this.tempData.ipv4);
        }
      },
      /**
       * 获取
       */
      getInterface() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionOne").then(res => {
          if (res == 414) {
            this.alertType = res;
          }
          this.tableData = res;
          this.loading = false;
          console.log(res);
        })
      },
      /**
       * 修改提交
       */
      postInterface() {
        if (this.tempData.name == null || this.tempData.enabled == null || this.tempData.type == null || this.tempData.description == null || this.tempData.ipv4[0].ip == null || this.tempData.ipv4[0].netmask == null || this.tempData.name == "" || this.tempData.enabled == "" || this.tempData.type == "" || this.tempData.description == "" || this.tempData.ipv4[0].ip == "" || this.tempData.ipv4[0].netmask == "") {
          this.$message({message: "不能有空", type: "error"});
        } else {
          this.$api.axiosPostJson("/RestconfApiDataFunctionOne", [{
            name: this.tempData.name,
            enabled: this.tempData.enabled,
            type: this.tempData.type,
            description: this.tempData.description,
            ipv4: this.tempData.ipv4
          }]).then(res => {
            console.log(res);
            if (res != 400) {
              this.reload();
              this.$message({message: "修改成功", type: "success"});
            } else {
              this.$message({message: "修改失败，请检查ip、子网掩码格式", type: "error"});
            }
          })
        }
      },
      /**
       * 重置
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    text-align: center;
  }
</style>
