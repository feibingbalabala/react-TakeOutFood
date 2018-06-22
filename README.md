# react-TakeOutFood

## 功能

### 用户端页面

* [ ] 首页
* [ ] 选择城市
* [ ] 搜索
* [ ] 详情页面
* [ ] 收藏购买
* [ ] 登录

### 管理后台

* [ ] 用户中心
* [ ] 评价功能

## 技术

系统框架：react + react-router + redux

构建工具：webpack + babel + less + postcss

数据交互：fetch + mock

辅助：npm + git

## 项目初始化

npm init 初始化项目

``` node
npm install webpack webpack-dev-server --save-dev

npm install react react-dom --save
```

--save和--save-dev可以将依赖分别记录到package.json中的dependencies和devDependencies下面，dependencies是项目运行是必须依赖的插件，例如react，jquery等等，不管是开发环境还是生产环境都需要依赖的插件。devDependencies为开发环境需要的依赖，生产环境不需要