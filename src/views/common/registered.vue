<template>
  <div id="registered">
    <el-card class="myCard" shadow="always">
      <div slot="header">
        <h1 style="text-align: center">用户注册</h1>
      </div>
      <el-form :model="form" :rules="form" :ref="form" label-width="100px" label-position="center">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="authority">
          <el-select v-model="form.authority" placeholder="请选择账号类型" @change="selectType(form.authority)" clearable>
            <el-option label="用户" value="1"></el-option>
            <el-option label="供应商" value="2"></el-option>
            <el-option label="管理员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <!--用户、管理员类型-->
        <template v-if="type==1||type==3">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <template v-if="type==1">
            <el-form-item label="供应商" prop="supplierId">
              <el-select v-model="form.supplierId" placeholder="请选择供应商">
                <div v-for="(supplier,index) in suppliers" :key="index">
                  <el-option :label="supplier.supplierName" :value="supplier.id"></el-option>
                </div>
              </el-select>
            </el-form-item>
          </template>
        </template>
        <!--供应商-->
        <template v-if="type==2">
          <el-form-item label="供应商名字" prop="supplierName">
            <el-input v-model="form.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="供应商类型" prop="types">
            <el-select v-model="form.types" placeholder="请选择供应商类型" clearable>
              <div v-for="(type,index) in supplierTypes" :key="index">
                <el-option :label="type.name" :value="type.id"></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <el-row>
        <el-col :span="6" :offset="7">
          <el-button type="primary" @click="register">注册</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="resetForm(form)">重置</el-button>
        </el-col>
      </el-row>
      <el-link type="danger" :underline="false" @click="$router.push({name:'login'})">立即登录</el-link>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "registered",
    data() {
      return {
        form: {
          account: null,//用户名
          password: null,//密码
          authority: null,//账号类型、权限
          email: null,//邮箱
          phone: null,//联系方式
          name: null,//用户姓名
          supplierId: null,//供应商Id
          supplierName: null,//供应商名字
          address: null,//商家地址
          types: null//供应商类型
        },
        /**
         * 账号类型
         */
        type: null,
        /**
         * 供应商列表
         */
        suppliers: [],
        /**
         * 产品类型表
         */
        supplierTypes: []
      }
    },
    methods: {
      /**
       * 重置查询
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.type = null;
      },
      /**
       * 选择账号类型
       * @param val
       */
      selectType(val) {
        this.type = val;
        this.form.supplierId = null;
        this.form.supplierName = null;
        this.form.address = null;
        this.form.types = null;
        if (this.type == 1) {
          /**
           * 获取供应商列表
           */
          this.$api.axiosGetJson("/supplier/supplierSelectAll").then(res => {
            console.log(res.data.supplier);
            this.suppliers = res.data.supplier;
          })
        } else if (this.type == 2) {
          /**
           * 获取商品类型表
           */
          this.$api.axiosGetJson("/supplier/supplierTypes").then(res => {
            console.log(res);
            this.supplierTypes = res.data.supplierTypes;
          })
        }
      },
      /**
       * 注册
       */
      register() {
        try {
          this.$api.axiosPost("/registered/registeredUser", {
            account: this.form.account,
            password: this.form.password,
            authority: this.form.authority,
            email: this.form.email,
            phone: this.form.phone,
            name: this.form.name,
            supplierId: this.form.supplierId,
            supplierName: this.form.supplierName,
            address: this.form.address,
            types: this.form.types
          }).then(res => {
            if (res.code == 200) {
              this.$message({message: "注册成功", type: "success"});
              this.$router.push({name: 'login'});
            } else
              this.$message.error('注册失败');
          })
        }catch (e) {
          this.$message.error('注册失败');
        }

      }
    }
  }
</script>

<style scoped>
  #registered {
    position: relative;
    background: url("../../assets/images/wallhaven-q6yd5q.jpg") no-repeat center center fixed;
    filter: brightness(.5);
    background-size: 100%;
    height: 100vh;
    transition: filter;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
  }

  #registered:hover {
    filter: brightness(1);
  }

  .myCard {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 100;
  }

  .el-form-item {
    text-align: center;
  }

  .el-form >>> .el-input {
    width: 90%;
  }

  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: 0 2px 20px 0 rgba(5, 119, 220, 0.92);
  }

  .el-card {
    width: 25%;
    background-color: #fff;
    transition: background-color;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
  }

  .el-card >>> .el-input__inner,
  .el-card >>> .el-input-group__prepend {
    border: 1px solid rgba(177, 172, 172, 0.53);
    transition: border;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
  }

  .el-card:hover {
    background: rgba(255, 255, 255, 0.75);
  }

  .el-card:hover >>> .el-input__inner {
    transition: font-weight, color;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    color: #151212;
    /*font-weight: 700;*/
    background: #fff9;
    border: 1px solid #dcdfe6;
  }

  .el-card:hover >>> .el-radio {
    color: rgba(0, 0, 0, 0.8);
  }

  .el-card >>> .el-card__header {
    background: rgba(5, 119, 220, 0.92);
    color: #fff;
    text-shadow: #fff;
  }

  .el-card:hover >>> .el-form-item__label {
    transition: color;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    color: #151212;
  }

  .el-card:hover >>> .el-link.el-link--danger {
    transition: font-weight;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    font-weight: 700;
    color: #e01212;
  }

  .el-select {
    width: 100%;
    margin-left: 5%;
  }

</style>
