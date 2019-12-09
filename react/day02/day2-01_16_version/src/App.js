import React,{Component} from 'react';
import Son from './son.js'

function wrap(Comm) {
    return class Temp extends Component {
        componentDidMount(){
            console.log('新加的包装组件的功能:hello');
        }
        render(h) {
            return <Comm />
        }
     }
}

function App() {
  return (
    <div className="App">
        {/* <Son /> */}
        { wrap(Son) }
    </div>
  );
}
// 导出成一个包装组件
export default App;
