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

## 笔记

## webpack配置采坑记

项目原本是webpack1.0的结果，作死的升到了4.0问题不断。[入门Webpack](https://segmentfault.com/a/1190000006178770?_ea=1088498)

### windows不支持NODE_ENV=development的问题

![avatar](/errorimg/error1.png)
解决方案：
1、通过npm install -s cross-env安装cross-env包
2、在NODE_ENV=development前面加上cross-env,如下所示
"start": "cross-env NODE_ENV=dev webpack-dev-server --progress --colors --mode development",

### Webpack 2.1.0-beta23 之后的config里不能直接包含自定义配置项

![avatar](/errorimg/error3.png)

``` js
  // 注释postcss
  // postcss: [
  //   require('autoprefixer') //调用autoprefixer插件，例如 display: flex
  // ],
  // 在plugins中添加
  new webpack.LoaderOptionsPlugin({
      options: {
          postcss: function () {
              return [autoprefixer];
          }
      }
  })
```

[参考](https://segmentfault.com/q/1010000006987956)

### webpack 升级Getting error: configuration.resolve.extensions[0] should not be empty

![avatar](/errorimg/error4.png)

``` js
// 在webpackconfig.js里面resolve.extensions数组中第一个参数修改成*
module.exports = {
  entry: path.resolve(__dirname, 'app/index.jsx'),
  output: {
      filename: "bundle.js"
  },
  resolve:{
      // 原先extensions:['', '.js','.jsx']
      extensions:['*', '.js','.jsx']
  },
}
```

### webpack 运行提示The 'mode' option has not been set

![avatar](/errorimg/error2.png)

在package.json中修改

``` js
  "scripts": {
    "start": " --mode development",
    "build": "--mode production",
  }
```

### It's no longer allowed to omit the '-loader' suffix when using loaders

![avatar](/errorimg/error5.png)

webpack貌似2.0后不支持缩写语法
webpack.config.js

``` js
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!postcss!less' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },
      { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // 限制大小5kb
      { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
    ]
  },
```

## jsx

``` js
import React from 'react'
import { render } from 'render-dom'

// 定义组件
class Hello extends React.Component {
  render() {
    return {
      // jsx语法，render中只能有一个elment元素进行包裹
      <div>
        <p className="title">123</p>
        <p style={{fontSzie: '50px'}}>hellow</p>
      </div>
    }
  }
}

render(
  <Hello/>,
  document.getElementById('root')
)
```