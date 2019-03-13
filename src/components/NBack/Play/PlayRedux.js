import {combineReducers} from 'redux'

/*
包含n 个action type名称常量
 */
export const UPDATE_PLAY_RESULT = 'update_play_result' // 更新游戏结果
export const UPDATE_PLAY_LEVEL = 'update_play_level' // 更新难度等级
export const INCREASE_PLAY_TIME = 'increase_play_time' // 增加游玩次数

/*
action creator模块
 */
const updatePlayResultList = (newList) => ({type:UPDATE_PLAY_RESULT,data:newList})

const updatePlayLevel = (playLevel) => ({type:UPDATE_PLAY_LEVEL,data:playLevel})

const increasePlayTime = () => ({type:INCREASE_PLAY_TIME})

export {updatePlayResultList,updatePlayLevel,increasePlayTime}


/*
根据老的state 和指定action, 处理返回一个新的state
 */
function playResultList (state=[],action){
  switch (action.type) {
    case UPDATE_PLAY_RESULT:
      return action.data
    default:
      return state
  }
}

function playLevel (state=1,action){
  console.log(`playLevel:${action.data}`)
  switch (action.type) {
    case UPDATE_PLAY_LEVEL:
      return action.data
    default:
      return state
  }
}

function playTime(state=0,action){
  switch (action.type) {
    case INCREASE_PLAY_TIME:
      return state+1
    default:
      return state
  }
}

// 向外暴露一个 reducers 对象 {playResultLIST:[],playLevel:0,playTime:0;}
export default combineReducers({
  playResultList, // Result,Play
  playLevel, // Header,Start
  playTime, // Start
})