<template>
  <div id="configurationTemplate">
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogFormShow()">新增模板<i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-button type="primary" @click="configurationTemplate">批量配置<i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(item,index) in modelCard" :key="index">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="color:#0097D3;font-size:20px;font-weight: 700;font-family:'Helvetica Neue'">
              {{item.modelname}}
            </span>
            <el-button style="float: right; transform: translateY(-15%);" type="text" @click="open(item.id)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button style="float: right; transform: translateY(-15%) translateX(-100%);" type="text"
                       @click="dialogFormShow(item.id)">
              <i class="el-icon-s-tools"></i>
            </el-button>
          </div>
          <div class="card-Content" @click="dialogFormShow(item.id)">
            <div v-for="(itemImg,indexImg) in imgArray" :key="indexImg">
              <el-image v-if="itemImg.id==item.logo" :src="itemImg.url"></el-image>
            </div>
            <p style="font-family:'Helvetica Neue'">
              <span style="color:#0097D3;font-size:15px;font-weight: 700;font-family:'Helvetica Neue'">模板名字：</span>
              {{item.remakes}}
            </p>
            <p>{{item.introduce}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <button class="my-button my-button-position">
      <span>更多配置模板</span>
    </button>

    <!--批量配置模板-->
    <el-dialog title="批量配置模板" :visible.sync="dialogTableVisible" width="80%">
      <el-row :gutter="20">
        <el-col :span="10">
          <p>可选择模板</p>
          <el-table :data="leftData" ref="leftTemp" @selection-change="checkLeft" :default-sort="{prop:'id'}"
                    max-height="250">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="modelname" label="模板名字"></el-table-column>
            <el-table-column prop="remakes" label="接口名字" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="introduce" label="地址" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogFormShow(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4" style="text-align: center;position: relative;top:50%;transform: translateY(50%)">
          <el-row>
            <el-button icon="el-icon-d-arrow-right"
                       type="primary"
                       @click="addConfigurationTemplate"
                       :disabled="leftData.length?(leftTemp.length?false:true):true"
            >
              添加
            </el-button>
          </el-row>
          <el-row>
            <el-button icon="el-icon-d-arrow-left"
                       type="primary"
                       @click="deleteConfigurationTemplate"
                       :disabled="rightData.length?(rightData.length?false:true):true"
            >
              移除
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="10">
          <p>已选择模板（并按此顺序配置）</p>
          <el-table :data="rightData" v-loading="loading" element-loading-text="正在配置中"
                    element-loading-spinner="el-icon-loading" ref="rightTemp" @selection-change="checkRight"
                    max-height="250">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="modelname" label="模板名字"></el-table-column>
            <el-table-column prop="remakes" label="接口名字" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="introduce" label="地址" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogFormShow(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-button type="primary" :disabled="rightData.length?false:true" @click="submitDevice">确定配置</el-button>
      </el-row>
    </el-dialog>

    <!--修改模板信息-->
    <el-dialog title="编辑模板配置" :visible.sync="dialogFormVisible" width="30%">
      <el-form :ref="templateForm" :model="templateForm" label-width="80px" size="medium">
        <el-form-item v-show="buttonType!=2" label="ID" prop="id">
          <el-input v-model="templateForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="模板名字" prop="modelname">
          <el-input v-model="templateForm.modelname"></el-input>
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-select v-model="templateForm.logo" placeholder="请选择logo">
            <el-option v-for="(itemImg,indexImg) in imgArray"
                       :key="indexImg"
                       :label="itemImg.name"
                       :value="itemImg.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板介绍" prop="remakes">
          <el-input v-model="templateForm.remakes"></el-input>
        </el-form-item>
        <el-form-item label="模板描述" prop="introduce">
          <el-input v-model="templateForm.introduce"></el-input>
        </el-form-item>
        <el-form-item label="url连接" prop="url">
          <el-input v-model="templateForm.url"></el-input>
        </el-form-item>
        <el-form-item label="模板" prop="model">
          <el-input type="textarea" v-model="templateForm.model" :autosize="{minRows:2,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-show="buttonType==1" type="primary" @click="putTemplate">修改</el-button>
          <el-button v-show="buttonType==2" type="primary" @click="addTemplate">添加</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import img1 from "@/assets/images/ACL.png";
  import img2 from "@/assets/images/DHCP.png";
  import img3 from "@/assets/images/isis.png";
  import img4 from "@/assets/images/NAT.png";
  import img5 from "@/assets/images/ospf.png";
  import img6 from "@/assets/images/环回口.png";

  export default {
    inject: ['reload'],
    name: "configurationTemplate",
    data() {
      return {
        modelCard: [],
        //批量配置模板
        dialogTableVisible: false,
        //loading状态
        loading: false,
        /**
         * 穿梭框
         * Data为表格数据
         * Temp为选中时暂存数组
         */
        rightData: [],
        leftData: [],
        rightTemp: [],
        leftTemp: [],
        /**
         * 修改模板信息表单
         */
        dialogFormVisible: false,
        buttonType: null,
        templateForm: {
          id: null,
          modelname: null,
          remakes: null,
          introduce: null,
          url: null,
          model: null,
          logo: null
        },
        temp: {
          id: null,
          modelname: null,
          remakes: null,
          introduce: null,
          url: null,
          model: null,
          logo: null
        },
        /**
         * 图片
         */
        imgArray: [
          {
            id: 1,
            name: 'ACL',
            url: img1
          }, {
            id: 2,
            name: 'DHCP',
            url: img2
          }, {
            id: 3,
            name: 'isis',
            url: img3
          }, {
            id: 4,
            name: 'NAT',
            url: img4
          }, {
            id: 5,
            name: 'ospf',
            url: img5
          }, {
            id: 6,
            name: '环回口',
            url: img6
          },]
      }
    },
    created() {
      this.getTemplate();
    },
    methods: {
      /**
       * 获取配制模板
       */
      getTemplate() {
        this.$api.axiosGetJson("/RestconfApiDataFunctionTwo/select").then(res => {
          console.log(res);
          this.modelCard = res;
        })
      },
      /**
       * 批量配置模板
       */
      configurationTemplate() {
        this.dialogTableVisible = true;
        this.leftData = JSON.parse(JSON.stringify(this.modelCard));
        this.rightData = []
        console.log(this.leftData);
      },
      /**
       * 选择暂存数组
       */
      checkRight(val) {
        this.rightTemp = val;
      },
      checkLeft(val) {
        this.leftTemp = val;
      },
      /**
       * 添加到预安装模板
       */
      addConfigurationTemplate() {
        this.rightData = this.handleConcatArr(this.rightData, this.leftTemp);
        this.handleRemoveTabList(this.leftTemp, this.leftData);
        this.leftTemp = [];
      },
      /**
       * 移除
       */
      deleteConfigurationTemplate() {
        this.leftData = this.handleConcatArr(this.leftData, this.rightTemp);
        this.handleRemoveTabList(this.rightTemp, this.rightData);
        this.rightTemp = [];
        this.leftData.sort();
      },

      handleConcatArr(a, b) {
        let arr = [];
        arr = arr.concat(a, b);
        return arr;
      },
      handleRemoveTabList(isNeedArr, originalArr) {
        if (isNeedArr.length && originalArr.length) {
          for (let i = 0; i < isNeedArr.length; i++) {
            for (let k = 0; k < originalArr.length; k++) {
              if (isNeedArr[i]["id"] === originalArr[k]["id"]) {
                originalArr.splice(k, 1);
              }
            }
          }
        }
      },

      /**
       * 设备配置模板
       */
      submitDevice() {
        this.loading = true;
        let id = [];
        for (const index in this.rightData) {
          id.push(this.rightData[index].id);
        }
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwo", {id: id}).then(res => {
          console.log(res);
          for (let i in res) {
            if (res[i].code == 401) {
              console.log(res[i].id);
              this.timer = window.setTimeout(() => {
                this.$message({
                  type: 'error',
                  message: '模板' + res[i].id + '配置失败'
                });
              }, 0)
            } else {
              console.log(res[i].id);
              this.timer = window.setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '模板' + res[i].id + '配置成功'
                });
              }, 0)
            }
            this.loading = false;
          }
        })

      },

      /**
       * 增加、修改模板配置表单
       */
      dialogFormShow(val) {
        this.dialogFormVisible = true;
        let id = [];
        id.push(val);
        if (val) {
          this.buttonType = 1;
          this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/select", {id: id}).then(res => {
            console.log(res);
            this.templateForm = res[0];
            this.temp = JSON.parse(JSON.stringify(this.templateForm))
          })
        } else {
          this.temp = {
            id: null,
            modelname: null,
            remakes: null,
            introduce: null,
            url: null,
            model: null,
            logo: null
          };
          this.buttonType = 2;
          this.templateForm = JSON.parse(JSON.stringify(this.temp))
        }
      },
      /**
       * 新增、修改模板
       */
      addTemplate() {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/add", {
          modelname: this.templateForm.modelname,
          remarks: this.templateForm.remakes,
          introduce: this.templateForm.introduce,
          url: this.templateForm.url,
          model: this.templateForm.model,
          logo: this.templateForm.logo
        }).then(res => {
          if (res == 200) {
            this.$message({message: "添加成功", type: "success"});
            this.reload();
          }
        })
      },
      putTemplate() {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/modify", {
          id: this.templateForm.id,
          modelname: this.templateForm.modelname,
          remarks: this.templateForm.remakes,
          introduce: this.templateForm.introduce,
          url: this.templateForm.url,
          model: this.templateForm.model,
          logo: this.templateForm.logo
        }).then(res => {
          console.log(res);
          if (res == 200) {
            this.$message({message: "修改成功", type: "success"});
            this.reload();
          } else {
            this.$message({message: "修改失败", type: "error"});
          }
        })
      },

      resetForm() {
        // this.$refs[formName].resetFields();
        this.templateForm = JSON.parse(JSON.stringify(this.temp))
      },

      /**
       * 删除警告
       */
      open(val) {
        let id = [];
        id.push(val);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTemplate(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 删除模板
       */
      deleteTemplate(val) {
        this.$api.axiosPostJson("/RestconfApiDataFunctionTwoMysql/del", {id: val}).then(res => {
          console.log(res);
          if (res[0].error == "200") {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.reload();
          } else
            this.$message({
              type: 'error',
              message: '删除失败'
            });
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .el-card {
    margin-bottom: 20px;
  }

  .el-card:hover {
    transition: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transform: translateY(-10px);
    box-shadow: 0 2px 12px 0 rgba(4, 142, 246, 0.5);
  }

  .card-Content {
    text-align: center;
    height: 225px;
  }

  .card-Content p {
    padding-bottom: 5px;
  }

  .el-select {
    width: 100%;
  }

  .my-button-position {
    position: absolute;
    right: 20px;
    top: 30%;
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
</style>
