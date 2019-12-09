import React,{ Component } from 'react';
import Son from './son.js';

class App extends Component {
    constructor(){
        super()
    }
    render(){
        let dom = null;
        let dom2;
        return (
            // { <React.Fragment>效果等同于div,但是不会产生多余的dom元素 }
            <React.Fragment>
                <span> you think </span>
                <Son>
                    {dom}
                </Son>
                <Son>
                    {dom2}
                </Son>
            </React.Fragment>
        )
    }
}

export default App;