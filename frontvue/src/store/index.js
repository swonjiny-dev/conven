import Vue from 'vue'
import Vuex from 'vuex'
import twitchStore from './twitchStore'
import convenStore from "./convenStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbarFlag: false, // 스낵바 노출유무
    snackbarMsg: '', // 스택바 메세지 
    snackbarColor: 'white', // 스낵바 색상
  },
  mutations : {
    // 스낵바 표현사용정보
    SET_SNACKBAR_SETING(state , {msg , color}){
      state.snackbarFlag=true;
      state.snackbarMsg=msg;
      state.snackbarColor=color;
    },
    // 스낵바 초기화
    SET_SNACKBAR_INIT(state){
      state.snackbarFlag=false;
      state.snackbarMsg='';
      state.snackbarColor='white';
    },
  },
  getters : {},
  actions : {},
  modules: {
    twitchStore,
    convenStore
  }
})
