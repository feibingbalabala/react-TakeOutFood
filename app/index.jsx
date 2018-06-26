import React from 'react'
import { render } from 'react-dom'

// import './static/css/common.less'

class Hello extends React.Component {
    render() {
        var num = 100
        var x = 1
        var y = 1
        var style = {fontSize: '30px'}
        var arr = ['a', 'b', 'c']
        var show = true
        return (
            <div>
                <p className="title">123</p>
                <p style={{fontSize: '50px'}}>hellow</p>
                /*大括号可以放js对象*/
                <p style={style}>world</p>
                <p>{num ? num : 'not num'}</p>
                {/*js的注释*/}
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
