import { combineReducers } from 'redux';
// 聚合所有reducer

import user from './user';
import city from './city';

export default combineReducers({
    user,
    city
})