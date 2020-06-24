# office

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目结构
    | -- dist                                                      // 打包目录
    | -- src                                                       // 源码目录
    |    | -- api                                                  // API接口
    |    | -- utils                                                // 工具函数存放位置
    |    | -- assets                                               // 静态资源
    |    |    | -- images                                          
    |    |    | -- css
    |    | -- views                                                // 页面视图
    |    |    | -- common                                          // 全局组件
    |    |    | -- pages                                           // 模块目录。里面的文件夹用 大驼峰 命名
    |    |    |    | -- BasicInformation                           // 基本资料      --作为例子需要改名
    |    | -- router                                               // 路由
    |    | -- App.vue                                              // 页面入口文件
    |    | -- main.js                                              // 程序入口文件，加载各种公共组件
    | -- package.json                                              // 项目及工具的依赖配置文件
    | -- README.md                                                 // 说明









