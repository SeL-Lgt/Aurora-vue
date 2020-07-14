<template>
  <div id="login">
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
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
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetForm(form)">重置</el-button>
          </el-form-item>
        </el-form>
        <el-link type="danger" :underline="false" @click="$router.push({name:'registered'})">没有账号?注册一下</el-link>
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
          password: null,
          authority: null
        },
        starsCount: 800,//星星数量
        distance: 800,//间隔
      }
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
          initStarsPopulation = 300;


      function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")"
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
    methods: {}
  }
</script>

<style scoped>
  .sky {
    background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b8);
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
    background: #f7f7b8;
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
    background-color: rgba(255, 255, 255, .3);
    border: 2px solid white;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, .5);
    border-radius: 20px;
    z-index: 100;
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
