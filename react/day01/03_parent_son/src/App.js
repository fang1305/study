import React,{Component} from 'react';
import Son from './son.js.js'

class App extends Component{
    constructor(){
        super();
        this.state = {
            age: 12,
            name: 'jack'
        }
    }
    render(){
        // 解构赋值
        let {age,name} = this.state;
        let header = <div>header</div>;
        let footer = <div>footer</div>;
        let text = 233;
        return (
            <div>
                我是APP组件,以下使用son组件
                <hr />
                {/* 组件的使用必须首字母大写 */}
                <Son age={age} name={ name } header={ header } footer={ footer } >
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </Son>
            </div>
        )
    }
}
export default App;
