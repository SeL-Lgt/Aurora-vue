<!--产品数据-->
<template>
  <div id="productData">
    <el-card class="box-card">
      <el-row type="flex">
        <el-form :model="inputList" :ref="inputList" :rules="inputList">
          <el-col :span="21">
            <el-col :span="8">
              <el-form-item label="用户名：" prop="account">
                <el-input placeholder="请输入用户名" v-model="inputList.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名：" prop="name">
                <el-input placeholder="请输入姓名" v-model="inputList.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商：" prop="supplier">
                <el-input placeholder="请输入供应商" v-model="inputList.supplier"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="3">
            <el-col :span="12">
              <el-button icon="el-icon-search"
                         @click="getUserById(inputList.account)"></el-button>
            </el-col>
            <el-col :span="12">
              <el-button icon="el-icon-delete"
                         @click="resetForm(inputList)"></el-button>
            </el-col>
          </el-col>
        </el-form>

      </el-row>
      <el-table :data="tableData">
        <div v-for="(item,index) in tableListName" :key="index">
          <el-table-column :fixed="item.key=='name'"
                           :prop="item.key"
                           :label="item.title"
                           align="center"
          ></el-table-column>
        </div>
        <el-table-column align="center" fixed="right" label="操作">
          <template v-slot:default>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "productData",
    data() {
      return {
        inputList: {
          account: null,
          name: null,
          supplier: null
        },
        tableListName: [
          {
            title: '产品来源',
            key: 'supplier.supplierName'
          },
          {
            title: '产品名字',
            key: 'name'
          }, {
            title: '产品类型',
            key: 'supplierType.name'
          }, {
            title: '单价',
            key: 'unitPrice'
          }
        ],
        tableData: []
      }
    },
    created() {
      this.getProductAll();
    },
    methods: {
      getProductAll() {
        this.$api.axiosGetJson("/product/productSelectAll").then(res => {
          console.log(res.data);
          this.tableData = res.data.product;
        }).catch(() => {

        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(this.$options.methods.getUserAll.bind(this)());
      }
    }
  }
</script>

<style scoped>
  .el-card{
    /*padding:80px;*/
  }

  .el-form >>> .el-input {
    width: 70%;
  }
</style>
