import { createStore } from 'redux';
// redux中只维护一个store树， 这个树下存储各个模块的state

// reducer聚合前
// import reducer from '../reducers/user';
// reducer聚合过后
import reducer from '../reducers';

export default function Store(initState) {
    return createStore(reducer, initState)
}
