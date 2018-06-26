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

### 基础用法

``` js
// 在入口文件app/index.jsx
import React from 'react'
import { render } from 'render-dom'

// 定义组件
class Hello extends React.Component {
    render() {
        var num = 100
        var x = 1
        var y = 1
        var style = {fontSize: '20px'}
        return (
            <div>
                <p className="title">123</p>
                <p style={{fontSize: '50px'}}>hello</p>
                // 大括号可以放js对象
                <p style={style}>world</p>
                <p>{num ? num : 'not num'}</p>
                {/*js的注释*/}
            </div>
        )
    }
}

render(
  <Hello/>,
  document.getElementById('root')
)
```

### 事件和if判断

``` js
import React from 'react'
import { render } from 'react-dom'

// import './static/css/common.less'

class Hello extends React.Component {
    render() {
        var arr = ['a', 'b', 'c']
        var show = true
        return (
            <div>
                <p onClick={this.clickHandler.bind(this)}>click</p>
                <ul>
                    {arr.map(function(item, index) {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
                <p style={{display: show ? 'display' : 'none'}}>if判断</p>
            </div>
        )
    }
    clickHandler () {
        console.log(Date.now())
        console.log(this.clickHandler)
    }
}

render(
    <Hello/>,
    document.getElementById('root')
)
```

这里加一个bind方法

bind方法生成了一个新的函数，称为绑定函数，传入bind方法的第一个參数作为这个绑定函数的this对象，传入bind的第二个參数连同后面调用绑定函数时传入的參数依照先后顺序（传入bind的在前）构成绑定函数的參数。

``` js
  var foo = {
      x: 3
  }
  var bar = function(){
      console.log(this.x);
  }
  bar();
  // undefined

  var boundFunc = bar.bind(foo);

  boundFunc();
  // 3
```

将bar方法和foo对象绑定后，bar中的this对象被替换为了foo，并生成了一个新的函数boundFunc，因此在全局环境中调用boundFunc时。也能够訪问到foo对象的属性。

与call、apply的差别
call、apply是改动函数的作用域，而且马上运行。而bind是返回了一个新的函数，不是马上运行，即call and apply call a function while bind creates a function。(bind在回调函数中经常使用到。)
