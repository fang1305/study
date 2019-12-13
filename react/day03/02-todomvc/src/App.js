// todos = todos.filter() 过滤
// todos.map() 遍历
// todos.forEach() // 遍历
// let index = todos.findIndex(t=>t.id==todo.id)
import React,{Component} from 'react';
import './App.css';

function convertClass(obj) {
    let classStr = '';
    for(let key in obj){
        if(obj[key]){
            classStr += key+' ';
        }
    }
    return classStr;
}

class App extends Component {
constructor(){
    // 使用this之前先super
    super();
    // 展示数据
    this.state = {
        newContent: '',
        todos:[
            {id: 1,isCompleted: true,content: '吃饭'},
            {id: 2,isCompleted: false,content: '睡觉'},
            {id: 3,isCompleted: true,content: '打豆豆'}
        ],
        editing: -1,
        filter: '#/'
    }
    this.valueHandler = this.valueHandler.bind(this);
}
// 组件初始化的时候,计算剩余数
componentDidMount(){
    this.computedLeftCount();
    // 根据hash情况,初始化filter
    this.renderHash();
}
// 3: 接收输入的数据
valueHandler(e,todo){
    if(todo){
        todo.content = e.target.value;
        this.setState({});
    }else{
        this.setState({
            newContent: e.target.value
        });
    }
   
}
// 4: 添加任务
addTodo(e){
    // 禁止默认时间
    e.preventDefault();
    // 排除未输入的情况
    if(this.state.newContent.trim() == '') return;
    // {id,isCompleted,content}
    // 4.1 计算id
    let maxId = -1;
    this.state.todos.forEach(todo=>{
        if(todo.id>maxId) maxId = todo.id;
    })
    maxId++;
    this.state.todos.push({
        id: maxId,
        isCompleted: false,
        content: this.state.newContent
    })
    // 视图更新
    this.setState({newContent: ''});
    // 清空输入框

    this.computedLeftCount();
}
// 5: 删除任务   
delTodo(todo){
    // 找索引
    // todos是引用数据类型赋值给的是地址,所以改他也改state里边的那个对象
    // num 是基本数据类型, let num = this.state.num
    // 更改num, state.num没有改变
    let { todos,num } = this.state;
    let index = todos.findIndex(t=> t.id == todo.id);
    todos.splice(index,1);
    this.setState({});
    // 更新数据
    this.computedLeftCount();
}
// 6: 双击编辑
beginEdit(e,todo){
    this.setState({
        editing: todo.id
    },()=>{
        // 在react异步渲染结束后的行为,类似VUE中$nextTick函数
        // 再进行新生成元素的操作
        this.refs['todo_'+todo.id].focus();
    })
    // 获取input-dom元素获取焦点 (1)input提供ref属性
    // (没有效果,因为此时该dom(ref)元素还没有出现)
    // this.refs['todo_'+todo.id].focus();
}
// 7: 编辑完成
editOver(e,todo){
    // 禁止默认事件
    e.preventDefault();
    this.setState({
        editing: -1
    });
}
// 计算剩余数
computedLeftCount(){
    this.state.showClear = false;
    let num = 0;
    let { todos } = this.state;
    todos.forEach(todo=>{
        if(!todo.isCompleted) num++
    });
    this.setState({
        showClear: num != todos.length,
        leftNum: num,
        toggleAll: num == 0
    });

}
// 2.渲染数组数据
renderList(){
    let { todos,editing,filter }= this.state; 
    // 如果是#/active,过滤掉数组中isCompleted: true
    // 如果是#/completed,过滤掉数组中isCompleted: false
    // todos = todos.filter() // 过滤,会让let todos指向别的地方,再改let todos不会影响this.state.todos
    let isOK = '';
    switch (filter) {
        case '#/active':
            isOK = false;
            // isCompleted: true
            break;
        case '#/completed':
            isOK = true;
            // isCompleted: false
            break;
        default:
            break;
    }
    // todos.map
    // 避免null和undefined
    return todos.map((todo) => {
        if(todo.isCompleted === isOK) return null;
        return (
            <li 
                className = { convertClass({completed: todo.isCompleted,editing: editing == todo.id}) }
                // className={ (todo.isCompleted?'completed ':'')+(editing==todo.id?"editing":'') }  
                key={todo.id}>
                <div className="view">
                    <input className="toggle" onChange={e=>this.checkBoxHandler(e,todo)} type="checkbox" checked={ todo.isCompleted } />
                    <label onDoubleClick={e=>this.beginEdit(e,todo)}>{ todo.content }</label>
                    <button className="destroy" onClick={e=>this.delTodo({todo})}></button>
                </div>
                <form onSubmit={e=>this.editOver(e,todo)}>
                    <input className="edit" onChange={e=>this.valueHandler(e,todo)} ref={ "todo_"+todo.id } value={ todo.content } onBlur={e=>this.editOver(e,todo)} />
                </form>
            </li>
        )
    })
}
// 5: 响应式checkbox
checkBoxHandler(e,todo){
    todo.isCompleted = e.target.checked;
    this.setState({});
    this.computedLeftCount();
}
toggleAllFun(e) {
    let { toggleAll,todos } = this.state;
    todos.forEach(todo=>{
        todo.isCompleted = !toggleAll;
    })
    this.setState({
        toggleAll: !toggleAll
    });
    this.computedLeftCount();
}
clearCompleted(e){
    let { toggleAll, todos } = this.state;
    for(let i=todos.length-1;i>-1;i--){
        if(todos[i].isCompleted){
            todos.splice(i, 1);
        }
        // todos[i].isCompleted?:'';
    }
    this.computedLeftCount();
}
// 13: 过滤显示
filterRender(e){
    console.log(e.target.hash);
    // 记住hash
    this.setState({
        filter: e.target.hash
    });
}
// 14: 根据hash来过滤输出
renderHash(){
    this.state.filter = window.location.hash;
    // 监视锚点后续改变
    window.addEventListener('hashchange',()=>{
        this.state.filter = window.location.hash;
        this.setState({});
    });
}
render(){
    let { newContent,leftNum,toggleAll,showClear,filter } = this.state;
    return (
        <React.Fragment>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    {/* 处理回车,使用onSubmit */}
                    <form onSubmit={e=>this.addTodo(e)}>
                        <input onBlur={e=>this.addTodo(e)} className="new-todo" placeholder="你写啊,你写啊,有本事你写啊" autoFocus value={newContent} onChange={e=>this.valueHandler(e)}  />
                    </form>
                </header>
                {/* This section should be hidden by default and shown when there are todos */}
                <section className="main">
                    <input id="toggle-all" onChange={e=>this.toggleAllFun(e)} checked={toggleAll} className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {/* These are here just to show the structure of the list items */}
                        {/* List items should get the className `editing` when editing and `completed` when marked as completed */}
                        { this.renderList() }
                        
                    </ul>
                </section>
                {/* This footer should hidden by default and shown when there are todos */}
                <footer className="footer">
                    {/* This should be `0 items left` by default */}
                    <span className="todo-count"><strong>{leftNum}</strong> item left</span>
                    {/* Remove this if you don't implement routing */}
                    <ul className="filters">
                        <li>
                            <a className={filter=='#/'?"selected":''} href="#/" onClick={e=>this.filterRender(e)}>All</a>
                        </li>
                        <li>
                            <a href="#/active" className={filter=='#/active'?"selected":''} onClick={e=>this.filterRender(e)}>Active</a>
                        </li>
                        <li>
                            <a href="#/completed" className={filter=='#/completed'?"selected":''} onClick={e=>this.filterRender(e)}>Completed</a>
                        </li>
                    </ul>
                    {/*Hidden if no completed items are left ↓ */}
                    {/* { showClear? <button onClick={e=>this.clearCompleted(e)} className="clear-completed">Clear completed</button>:''} */}
                    { showClear && <button onClick={e=>this.clearCompleted(e)} className="clear-completed">Clear completed</button>}
                    
                </footer>
            </section>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                {/* Remove the below line ↓ */}
                <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                {/* Change this out with your name and url ↓ */}
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </React.Fragment>
    );
    }
}

export default App;
