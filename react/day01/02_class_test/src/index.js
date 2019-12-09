// 1. 引入react   
import React from 'react';
// 2. 引入ReactDom对象
import ReactDom from 'react-dom';

import App from './app.js';
import App2 from './app2.js';

// 渲染到指定的元素上
//  - ReactDom.render(<arr/>,document.getElementById('app'));
ReactDom.render(<App />,document.getElementById('root'));
