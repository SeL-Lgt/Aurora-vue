<template>
  <div id="configurationTemplate">
    <el-row>
      <el-col>
        <el-button type="primary">新增模板<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" @click="dialogTableVisible=true">批量配置<i class="el-icon-upload el-icon--right"></i>
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
          <el-table :data="modelCard">
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="id" label="ID"></el-table-column>
            <el-table-column property="modelname" label="模板名字"></el-table-column>
            <el-table-column property="remakes" label="接口名字"></el-table-column>
            <el-table-column property="introduce" label="地址"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4" style="text-align: center;position: relative;top:0%;transform: translateY(50%)">
          <el-row>
            <el-button icon="el-icon-d-arrow-right"
                       type="primary">
              添加
            </el-button>
          </el-row>
          <el-row>
            <el-button icon="el-icon-d-arrow-left"
                       type="primary">
              移除
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-table :data="modelCard">
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="id" label="ID"></el-table-column>
            <el-table-column property="modelname" label="模板名字"></el-table-column>
            <el-table-column property="remakes" label="接口名字"></el-table-column>
            <el-table-column property="introduce" label="地址"></el-table-column>
          </el-table>
        </el-col>
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
          },
          {
            "id": 2,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环2"
          }, {
            "id": 1,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环1"
          },
          {
            "id": 2,
            "modelname": "LoopBack6",
            "remakes": "创汇还口",
            "introduce": "回环2"
          }
        ]
      }
    },
    methods:{
      /**
       * 批量配置模板
       */
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
