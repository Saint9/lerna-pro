## 目录结构

```
├─public                // 静态资源
│ ├─favicon.ico         // 网站图标
│ └─index.html          // 入口页面
│
│─src                   // 源码
│ ├─assets              // 静态文件目录
│ ├─components          // 网站公用组件目录
│ ├─layouts             // 页面布局
│ │ ├─PageView          // 包含页面头部视图
│ │ ├─RouteView         // 路由视图-进行页面跳转
│ │ ├─TabbarView        // 包含页面头部和底部导航跳转视图
│ ├─style               // 样式
│ │ ├─common.less       // 公共样式
│ │ ├─var.less          // 常用样式变量
│ ├─utils               // 工具类
│ │ ├─request.js        // axios请求
│ ├─pages               // 页面
│ │ └─tabbar            // tabbar页面
│ ├─router              // 路由
│ ├─store               // 状态存储
│ ├─app.config.js       // 应用配置文件
│ ├─App.vue             // 项目入口文件
│ └─main.js             // 主入口文件
│
├─.browserslistrc       // 浏览器的兼容
├─.eslintrc.js          // ES-lint校验
├─.gitignore            // git忽略配置文件
├─babel.config.js       // babel语法编译
├─package.json          // 项目配置
├─README.md             // 项目说明书
└─vue.config.js         // 配置文件
```