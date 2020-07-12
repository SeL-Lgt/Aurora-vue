<template>
  <div>
    <div id="login">
    </div>
    <el-card class="myCard" shadow="always">
      <div slot="header">
        <h1 style="text-align: center">Aurora</h1>
      </div>
      <el-form :model="form" :rules="form" :ref="form">
        <el-form-item prop="account">
          <el-input v-model="form.account">
            <template slot="prepend"><i class="el-icon-s-custom"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password">
            <template slot="prepend"><i class="el-icon-postcard"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="authority">
          <el-radio-group v-model="form.authority">
            <el-radio label="1">用户</el-radio>
            <el-radio label="2">供应商</el-radio>
            <el-radio label="3">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm(form)">重置</el-button>
        </el-form-item>
      </el-form>
      <el-link type="danger" :underline="false" @click="$router.push({name:'registered'})">没有账号?注册一下</el-link>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "login.vue",
    data() {
      return {
        form: {
          account: null,
          password: null,
          authority: null
        }
      }
    },
    methods: {
      /**
       * 重置查询
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /**
       * 登录
       */
      login() {
        console.log(this.form);
        this.$api.axiosPost("/admin/login/", {
          account: this.form.account,
          password: this.form.password,
          authority: this.form.authority
        }).then(res => {
          if (res.code == 200) {
            this.$message({message: "登录成功", type: "success"});
            this.$router.push({name: 'home'});
          } else
            this.$message.error('登录失败');
        })
      }
    }
  }
</script>

<style scoped>
  #login {
    position: relative;
    background: url("../../assets/images/wallhaven-q6yd5q.jpg") no-repeat center center fixed;
    filter: brightness(.5);
    background-size: 100%;
    height: 100vh;
    transition: filter;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
  }

  #login:hover {
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
