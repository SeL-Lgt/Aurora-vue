<template>
  <div id="sidebar">
    <el-menu
        router
        unique-opened
        :default-active="$router.path"
    >
      <template v-for="item in items">
        <!--第一层路由：是否有子目录-->
        <template v-if="item.subs">
          <el-submenu :index="item.index"
                      :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>

            <template v-for="subItem in item.subs">
              <!--第二层目录：是否有子目录-->
              <el-submenu v-if="subItem.subs"
                          :index="item.index+'/'+subItem.index"
                          :key="item.index+'/'+subItem.index">
                <template slot="title">{{subItem.title}}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs"
                              :key="i"
                              :index="item.index+'/'+subItem.index+'/'+threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>

              <el-menu-item v-else
                            :index="item.index+'/'+subItem.index"
                            :key="item.index+'/'+subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>

          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "sidebar",
    data() {
      return {
        collapse: false,
        items: [
          {
            icon: 'el-icon-s-home',
            index: '/home',
            title: '系统首页'
          },
          {
            icon: 'el-icon-s-data',
            index: '/interfaceStatus',
            title: '设备接口状态'
          },
          {
            icon: 'el-icon-s-check',
            index: '/configuration',
            title: '配置模板'
          },
          {
            icon: 'el-icon-s-promotion',
            index: '/ddos',
            title: 'ddos防护攻击'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
