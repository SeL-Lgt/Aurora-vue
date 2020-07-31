<template>
  <div id="login">
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
      <el-card class="myCard" shadow="always">
        <h1 style="color:#fff;text-align: center;font-size: 3em">Login</h1>
        <el-form :model="form" :rules="form" :ref="form">
          <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="username" @blur="inputUserBlur()"
                      @keyup.enter.native="loginBtn()">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="password" type="password" @blur="inputPsdBlur()"
                      @keyup.enter.native="loginBtn()">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="SignButton" @click="loginBtn">Sign in</el-button>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login.vue",
    data() {
      return {
        form: {
          account: null,
          password: null
        },
        starsCount: 800,//星星数量
        distance: 800,//间隔
      }
    },
    created() {
      this.title();
    },
    mounted() {
      let _this = this;
      _this.$refs.sky.width = window.innerWidth;
      _this.$refs.sky.height = window.innerHeight;

      var canvas = _this.$refs.canvas,
          ctx = canvas.getContext("2d"),
          _width = _this.$refs.sky.width,
          _height = _this.$refs.sky.height,
          stars = [],
          initStarsPopulation = 900;


      function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,0," + alpha + ")"
      }

      Star.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      }
      Star.prototype.move = function () {
        this.y -= 1;
        if (this.y <= -10) this.y = _height + 10;
        this.draw();
      }
      Star.prototype.die = function () {
        stars[this.id] = null;
        delete stars[this.id];
      }

      function setCanvasSize() {
        canvas.setAttribute("width", _width)
        canvas.setAttribute("height", _height)
      }

      function _init_() {
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < initStarsPopulation; i++) {
          stars[i] = new Star(i, Math.floor(Math.random() * _width), Math.floor(Math.random() * _height));
        }
        ctx.shadowBlur = 0;
        animate();
      }

      setCanvasSize();
      _init_();

      function animate() {
        ctx.clearRect(0, 0, _width, _height);
        for (var i in stars) {
          stars[i].move();
        }
        requestAnimationFrame(animate);
      }
    },
    methods: {
      inputUserBlur() {
        if (this.form.account == '' || this.form.account == null) {
          this.$message({
            message: '用户名不能为空',
            type: 'warning'
          });
          return false;
        } else
          return true;
      },
      inputPsdBlur() {
        if (this.form.password == '' || this.form.password == null) {
          this.$message({
            message: '密码不能为空',
            type: 'warning'
          });
          return false;
        } else
          return true;
      },
      loginBtn() {
        if (this.inputUserBlur() && this.inputPsdBlur()) {
          this.form.account = this.form.account.toLowerCase();
          this.form.password = this.form.password.toLowerCase();
          if (this.form.account != 'admin' || this.form.password != 'admin') {
            this.$message({
              message: '账号或密码不正确',
              type: 'error'
            });
          } else {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem('username', JSON.stringify(this.account));
            this.account = '';
            this.password = '';
            this.$router.push('/home')
          }
        }
      },
      title() {
        const h = this.$createElement;

        this.$notify({
          title: '本系统默认账号',
          message: h('i', { style: 'color: teal'}, '账号：admin  密码：admin')
        });
      },

    }

  }
</script>

<style scoped>
  .sky {
    background: radial-gradient(220% 105% at top center, #011195 10%, #0d5caf 40%, #494acb 65%, #5c3087);
    height: 100vh;
    overflow: hidden;
  }

  .stars {
    transform: perspective(300px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left: 0%;
    bottom: 0;
    animation: rotate 90s infinite linear;
  }

  .star {
    width: 2px;
    height: 2px;
    background: #f5fd00;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
  }

  .myCard {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 25%;
    background-color: rgba(255, 255, 255, 0.09);
    border: 0px solid white;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .el-card >>> .el-card__body {
    padding: 40px;
  }

  .el-input {
    border-bottom: 1px solid #fff;
  }

  .el-input >>> .el-input__inner {
    border: 0px;
    background: #fff0;
    color: #fff;
  }

  .el-input >>> .el-input__inner::placeholder {
    text-transform: uppercase;
  }

  .el-form {
    width: 80%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }

  .el-form-item >>> .el-form-item__content {
    text-align: center;
  }

  .el-form-item {
    margin-top: 44px;
    margin-bottom: 0px;
  }

  .SignButton {
    color: white;
    border: 0px;
    width: 100%;
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    text-transform: uppercase;
  }

  .SignButton:hover {
    color: #22affa;
  }

  @keyframes rotate {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(360deg);
    }
  }

</style>
