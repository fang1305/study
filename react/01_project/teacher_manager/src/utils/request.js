// 封装请求axios的实例
import Axios from 'axios';
import { serverHost,port } from './config';
// 创建一个新实例
let request = Axios.create({
    // 配置公共属性
    baseUrl: `${serverHost}:${port}`
});