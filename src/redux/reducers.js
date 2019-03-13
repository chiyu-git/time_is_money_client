/* 整合所有组件的reducers */

import playInfo from '../components/NBack/Play/PlayRedux'

import { combineReducers } from 'redux';

export default combineReducers({playInfo})
// {playInfo:{playResultLIST:[],playLevel:0,playTime:0},}