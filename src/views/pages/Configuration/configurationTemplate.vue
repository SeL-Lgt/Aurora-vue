<template>
  <div id="configurationTemplate">

    <button class="my-button my-button-position" @click="drawer=true">
      <span>更多配置模板</span>
    </button>

    <el-card v-show="isShow==true">
      简介
    </el-card>

    <div v-show="isShow==false">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="getDBModel(),dialog=true">数据库模板管理</el-button>
          <el-button type="primary">新增思科项目模板</el-button>
        </el-col>
        <el-col :span="12">
          <el-radio-group v-model="radio1" style="float:right">
            <el-radio-button label="表格"></el-radio-button>
            <el-radio-button label="卡片"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-card>
        <el-table v-show="radio1=='表格'">
        </el-table>
      </el-card>
    </div>

    <!--
      项目导航栏
     -->
    <el-drawer title="各类项目" :visible.sync="drawer" :withHeader="false" size="20%">
      <p style="text-align: center;margin-bottom: 10px;">请选择项目模块</p>
      <el-menu v-loading="loading" element-loading-text="正在请求中" style="margin-bottom: 40px">
        <div v-for="(item,index) in NavigationBar" :key="index">
          <el-menu-item :index="item.id.toString()">{{item.name}}</el-menu-item>
        </div>
      </el-menu>
      <el-button type="primary" style="position:fixed;flex: 0;bottom:0;width: calc(20vw);border-radius: 0"
                 @click="ciscoProjectDialog=true">创建项目
      </el-button>
    </el-drawer>

    <!--
      数据库模板管理
    -->
    <el-dialog title="数据库模板管理" :visible.sync="dialog">
      <!--表格-->
      <el-row>
        <el-table :data="DBModel" max-height="300">
          <el-table-column v-for="(item,index) in DBModelTable" :key="index"
                           align="center"
                           :prop="item.key"
                           :label="item.title"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="getDBModelById(scope.row.id),DBDialog=true">
                修改
              </el-button>
              <el-button type="text" @click="deleteDBModel(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <div style="text-align: right">
        <el-button type="primary" @click="DBAddDialog=true">添加数据库模板</el-button>
      </div>

      <!--
        弹出层
      -->
      <el-dialog title="修改数据库模板信息" :visible.sync="DBDialog" width="30%" append-to-body>
        <el-form :ref="DBForm" :model="DBForm" label-width="80px">
          <el-form-item v-for="(item,index) in DBModelTable" :key="index" :label="item.title" :prop="item.key">
            <el-input :disabled="item.key=='id'?true:false" v-model="DBForm[item.key]"></el-input>
          </el-form-item>
          <el-form-item label="model" prop="model">
            <el-input type="textarea" v-model="DBForm.model"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateDBModel">立即修改</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--
        弹出层
       -->
      <el-dialog title="添加数据库模板" :visible.sync="DBAddDialog" width="30%" append-to-body>
        <el-form :ref="DBAddForm" :model="DBAddForm" label-width="80px">
          <el-form-item v-for="(item,index) in DBModelTable" :key="index" :label="item.title" :prop="item.key">
            <el-input v-model="DBAddForm[item.key]"></el-input>
          </el-form-item>
          <el-form-item label="model" prop="model">
            <el-input type="textarea" v-model="DBAddForm.model"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateDBModel">添加</el-button>
            <el-button @click="resetForm(DBAddForm)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>

    <!--
      思科添加项目
    -->
    <el-dialog title="创建思科项目" :visible.sync="ciscoProjectDialog" width="30%">
      <el-row>
        项目名字：
        <el-input v-model="ciscoAddProject" style="width:80%">ss</el-input>
      </el-row>
      <el-row style="text-align:center;margin-bottom:0">
        <el-button type="primary" v-loading="ciscoAddLoading" element-loading-text="正在请求中"
                   @click="ciscoAddLoading=true,ciscoAddProjectName()"
        >
          添加项目
        </el-button>
        <el-button @click="ciscoProjectDialog=false,ciscoAddProject=null">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "configurationTemplate",
    data() {
      return {
        isShow: false,
        radio1: "表格",
        drawer: false,
        dialog: false,
        loading: true,
        NavigationBar: [],//项目导航栏

        DBModel: [],
        DBModelTable: [
          {
            title: "ID",
            key: "id"
          }
          , {
            title: "模板名字",
            key: "modelname"
          }, {
            title: "？？",
            key: "remakes"
          }, {
            title: "详细介绍",
            key: "introduce"
          }],//编辑数据库的表
        DBDialog: false,
        DBForm: {},
        tempForm: {},

        DBAddDialog: false,
        DBAddForm: {
          "modelname": null,
          "remakes": null,
          "introduce": null,
          "model": null,
          "logo": 1
        },

        ciscoProjectDialog: false,
        ciscoAddProject: null,
        ciscoAddLoading: false
      }
    },
    created() {
      this.getNavigationBar();
    },
    methods: {
      /**
       * 获取数据所有模板信息
       */
      getDBModel() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionTwo/select").then(res => {
          if (res != null) {
            this.DBModel = res;
          }
        })
      },
      /**
       * 获取模板的详细数据
       */
      getDBModelById(id) {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/select", {id: id}).then(res => {
          this.DBForm = res;
          this.tempForm = JSON.parse(JSON.stringify(this.DBForm));
        })
      },
      /**
       * 更新数据库模板的数据
       */
      updateDBModel() {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/updata", this.DBForm).then(res => {
          if (res == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.reload();
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        })
      },
      resetForm(formName) {
        if (formName != null) {
          this.$refs[formName].resetFields();
        }
        this.DBForm = JSON.parse(JSON.stringify(this.tempForm));
      },
      /**
       * 删除数据库模板
       */
      deleteDBModel(id) {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/del", {id: [id]}).then(res => {
          if (res[0].code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.reload();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      },


      /**
       * 获取思科项目导航栏
       */
      getNavigationBar() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionTwo/OllProject").then(res => {
          if (res != null) {
            this.NavigationBar = res;
            this.loading = false;
          }
        })
      },
      /**
       * 添加思科项目
       */
      ciscoAddProjectName() {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwo/CreateProject", {name: this.ciscoAddProject}).then(res => {
          if (res != null) {
            this.ciscoAddLoading = false;
          }
          if (res == '400') {
            this.$message({
              type: 'error',
              message: '添加失败!'
            });
          } else if (res == '500') {
            this.$message({
              type: 'warning',
              message: '该名字已存在!'
            });
          } else {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.reload();
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .my-button-position {
    position: absolute;
    right: calc(1.5vw);
    top: calc(30vh);
    transform: translateY(50%);
    z-index: 9;
  }

  .my-button {
    padding: 40px 20px;
    background-color: #409EFF;
    border: 1px solid #409EFF;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    font-size: 17px;
    font-weight: 500;
    color: #FFF;
    outline: none;
  }

  .my-button span {
    writing-mode: vertical-rl;
  }

  .el-menu >>> .el-loading-spinner {
    margin-top: 0px;
    top: calc(40vh);
  }

  .el-drawer__wrapper >>> .el-drawer {
    overflow: auto;
  }
</style>
