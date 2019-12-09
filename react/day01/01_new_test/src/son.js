import React,{Component} from 'react';

class Son extends Component {
    constructor(){
        super();
        this.state = {
            num: 3
        }
        this.addNum = this.addNum.bind(this);
    }
    addNum(){
        this.setState({
            num: this.state.num+1
        })
    }
    render(h) {
        
        return (
            <div>
                hahha<br/>
                {this.props.children}
                {this.state.num}
                <div onclick={this.addNum} >有本事你点啊</div>
            </div>
        )
    }
}
export default Son;