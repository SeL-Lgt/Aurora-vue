<!--客户数据-->
<template>
  <div id="customerData">
    <el-card class="box-card">
      <!--
          表单查询部分
      -->
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
              <el-button icon="el-icon-search" @click="getUserFurry()"></el-button>
            </el-col>
            <el-col :span="12">
              <el-button icon="el-icon-delete"
                         @click="resetForm()"></el-button>
            </el-col>
          </el-col>
        </el-form>

      </el-row>
      <!--
          表格位置
      -->
      <el-table :data="tableData">
        <div v-for="(item,index) in tableListName" :key="index">
          <el-table-column :fixed="item.key=='account'"
                           :prop="item.key"
                           :label="item.title"
                           align="center"
          ></el-table-column>
        </div>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="drawer=true,getUserById(scope.row.id),getSupplierAll()">编辑</el-button>
            <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer title="编辑信息"
               :visible.sync="drawer"
               size="30%"
               style="outline:none;"
               custom-class="demo-drawer"
    >
      <el-form :ref="form" :model="form" :rules="form" label-width="80px">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-select v-model="form.supplierId" :placeholder="form.supplierName">
            <el-option
                v-for="item in supplierData"
                :key="item.id"
                :label="item.supplierName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="15" :offset="6">
          <el-button type="primary" @click="putUser()">确定</el-button>
          <el-button @click="resetPutForm()">取 消</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "customerData",
    data() {
      return {
        drawer: false,//抽屉
        inputList: {
          account: null,
          name: null,
          supplier: null
        },
        tableListName: [
          {
            title: '供应商',
            key: 'supplierName'
          },
          {
            title: '用户名',
            key: 'account'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '电话号码',
            key: 'phone',
          },
          {
            title: '邮箱',
            key: 'email'
          }
        ],
        tableData: [],
        /**
         * 供应商数据
         */
        supplierData: [],
        form: {
          // supplierId: null,//供应商ID
          // supplierName: null,//供应商
          // account: null,//用户名
          // name: null,//姓名
          // phone: null,//电话号码
          // email: null //邮箱
        },
        /**
         * 暂存
         */
        tempForm: {}
      }
    },
    created() {
      this.getUserAll();
    },
    methods: {
      /**
       * 查询所有用户数据
       */
      getUserAll() {
        this.$api.axiosGetJson("/user/userSelectAll").then(res => {
          this.tableData = res.data.user;
          console.log(res.data.user);
        }).catch(() => {
        })
      },
      /**
       * 根据id查询用户数据
       * @param id
       */
      getUserById(id) {
        console.log(id);
        this.$api.axiosGetJson("/user/userSelectId/" + id).then(res => {
          this.form = res.data.user[0];
          this.tempForm = JSON.parse(JSON.stringify(this.form));
        }).catch(() => {
        });
      },
      /**
       *  模糊查询
       */
      getUserFurry() {
        this.$api.axiosGet("/user/FuzzyQuery",{
          account:this.inputList.account,
          name:this.inputList.name,
          supplierName:this.inputList.supplier
        }).then(res => {
          console.log(res);
          this.tableData = res.data.user;
        }).catch(() => {
        })
      },
      /**
       * 获取供应商数据
       */
      getSupplierAll() {
        this.$api.axiosGetJson("/supplier/supplierSelectAll").then(res => {
          console.log(res.data);
          this.supplierData = res.data.supplier;
        })
      },
      /**
       * 修改用户数据
       */
      putUser() {
        this.$api.axiosPut("/user/updateUser", {
          id: this.form.id,
          email: this.form.email,
          phone: this.form.phone,
          supplierId: this.form.supplierId
        }).then(res => {
          if (res.code == 200) {
            this.$message({message: "修改成功", type: "success"});
            this.$options.methods.getUserAll.bind(this)();
            this.drawer = false;
          } else {
            this.$message.error('注册失败');
            this.$options.methods.resetPutForm.bind(this)();
          }
        });
      },
      /**
       * 删除用户数据
       */
      deleteUser(id) {
        this.$api.axiosDelete("/user/deleteUser/" + id).then(res => {
          if (res.code == 200) {
            this.$message({message: "删除成功", type: "success"});
          } else {
            this.$message.error('删除失败');
          }
          this.$options.methods.getUserAll.bind(this)();
        });
      },

      /**
       * 重置查询
       * @param formName
       */
      resetForm() {
        this.inputList.supplier = null;
        this.inputList.name = null;
        this.inputList.account = null;
        this.$options.methods.getUserAll.bind(this)();
      },
      resetPutForm() {
        this.form = JSON.parse(JSON.stringify(this.tempForm));
      }
    }
  }
</script>

<style scoped>
  .el-form >>> .el-input {
    width: 70%;

  }

</style>
