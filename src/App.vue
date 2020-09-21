<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      this.addQuneeJs();
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      addQuneeJs() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://demo.qunee.com/lib/qunee-min.js';
        document.body.appendChild(s);
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      }
    }
  }
</script>

<style>
  #app {
    overflow: hidden;
  }
</style>
