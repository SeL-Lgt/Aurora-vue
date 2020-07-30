<template>
  <div id="interfaceInformation">
    <el-card class="box-card">
      <!--
         表格位置
     -->
      <el-table :data="tableData" empty-text="正在请求数据，请稍等">
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
            <el-button type="text" @click="dialogShow(scope.row)">编辑</el-button>
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
            <el-input v-model="tempData.ipv4[indexOne].ip"></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" :prop="`ipv4[${indexOne}].netmask`">
            <el-input v-model="tempData.ipv4[indexOne].netmask"></el-input>
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
    name: "interfaceInformation",
    data() {
      return {
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
          console.log(res);
        })
      },
      /**
       * 修改提交
       */
      postInterface() {
        // let data=[];
        // data=[{
        //
        // }]
        this.$api.axiosPostJson("/RestconfApiDataFunctionOne", [{
          name: this.tempData.name,
          enabled: this.tempData.enabled,
          type: this.tempData.type,
          description: this.tempData.description,
          ipv4: this.tempData.ipv4
        }]).then(res => {
          console.log(res);
          if (res == 400) {
            this.$message({message: "修改失败", type: "error"});
          } else {
            this.reload();
            this.$message({message: "修改成功", type: "success"});
          }
        })
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
