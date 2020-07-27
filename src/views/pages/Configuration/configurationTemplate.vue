<template>
  <div id="configurationTemplate">
    <el-row>
      <el-col>
        <el-button type="primary">新增模板<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" @click="configurationTemplate">批量配置<i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(item,index) in modelCard" :key="index">
        <el-card>
          <div class="card-Content">
            <p>{{item.modelname}}</p>
            <el-image :src="CardImg"></el-image>
            <p>{{item.id}}</p>
            <p>{{item.introduce}}</p>
            <p>{{item.remakes}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="批量配置模板" :visible.sync="dialogTableVisible" width="80%">
      <el-row :gutter="20">
        <el-col :span="10">
          <p>可选择模板</p>
          <el-table :data="leftData" ref="leftTemp" @selection-change="checkLeft" :default-sort="{prop:'id'}"
                    max-height="250">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="modelname" label="模板名字"></el-table-column>
            <el-table-column prop="remakes" label="接口名字"></el-table-column>
            <el-table-column prop="introduce" label="地址"></el-table-column>
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
          <el-table :data="rightData" ref="rightTemp" @selection-change="checkRight" max-height="250">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="modelname" label="模板名字"></el-table-column>
            <el-table-column prop="remakes" label="接口名字"></el-table-column>
            <el-table-column prop="introduce" label="地址"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-button type="primary" :disabled="rightData.length?false:true">确定配置</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import imgUrl from "@/assets/images/img.jpg";

  export default {
    name: "configurationTemplate",
    data() {
      return {
        //批量配置模板
        dialogTableVisible: false,
        CardImg: imgUrl,
        modelCard: [
          {
            "id": 1,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环1"
          }, {
            "id": 6,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环1"
          }, {
            "id": 7,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环1"
          },
          {
            "id": 2,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环2"
          }, {
            "id": 3,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环1"
          },
          {
            "id": 4,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环2"
          }
        ],
        rightData: [],
        leftData: [],
        rightTemp: [],
        leftTemp: []
      }
    },
    methods: {
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
  }
</style>
