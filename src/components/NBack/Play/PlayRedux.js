import {combineReducers} from 'redux'

/*
包含n 个action type名称常量
 */
export const UPDATE_PLAY_RESULT_LIST = 'update_play_result_list' // 更新游戏结果
export const UPDATE_PLAY_LEVEL = 'update_play_level' // 更新难度等级
export const UPDATE_PLAY_TIME = 'update_play_time' // 更新游玩次数

/*
action creator模块
 */
// play Start初始化
const updatePlayResultList = (newList) => {
  localStorage.setItem('playResultList',JSON.stringify(newList))
  return {type:UPDATE_PLAY_RESULT_LIST,data:newList}
}
// play Start初始化
const updatePlayLevelArr = (playLevelArr) => {
  localStorage.setItem('playLevelArr',JSON.stringify(playLevelArr))
  return {type:UPDATE_PLAY_LEVEL,data:playLevelArr}
}
// Play Start初始化
const updatePlayTime = (playTime) => {
  localStorage.setItem('playTime',JSON.stringify(playTime))
  return {type:UPDATE_PLAY_TIME,data:playTime}
}

export {updatePlayResultList,updatePlayLevelArr,updatePlayTime}


/*
根据老的state 和指定action, 处理返回一个新的state
 */

function playResultList (state=[],action){
  switch (action.type) {
    case UPDATE_PLAY_RESULT_LIST:
      return action.data
    default:
      return state
  }
}

function playLevelArr (state=[3,3],action){
  switch (action.type) {
    case UPDATE_PLAY_LEVEL:
      console.log(`playLevel:${action.data[1]}`)
      return action.data
    default:
      return state
  }
}

function playTime(state=0,action){
  switch (action.type) {
    case UPDATE_PLAY_TIME:
      return action.data
    default:
      return state
  }
}

// 向外暴露一个 reducers 对象 {playResultLIST:[],playLevel:0,playTime:0;}
export default combineReducers({
  playResultList, // Result,Play
  playLevelArr, // Header,Start
  playTime, // Start
})