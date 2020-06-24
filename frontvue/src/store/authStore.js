import * as api from "../api/request";

const authStore = {
  namespaced: true,
  state : {
    authToken : null,
    user : null
  },
  mutations : {
    SET_USER(state , user){
      state.user = user;
    },
    SET_AUTHTOKEN(state , token){
      state.authToken = token;
      api.setAuthInHeader(token);
    },
    

  },
  getters : {
    IS_AUTH(state) {
      return !!state.authToken
    }
  },
  actions : {
    // 스트리머 목록 정보 확인
    LOGIN({ commit } , {email , password}){
      commit('SET_SNACKBAR_INIT', null,{ root: true });
      return api.auth.login(email ,password )
      .then((res)=>{
        commit('SET_USER' , res.user);
        commit('SET_AUTHTOKEN' , res.authToken);
       
      })
      .catch(error=> {
        console.error(error);
        let msg = null;
        if(error.status === 404) {
          msg = "잘못된 요청입니다."
        }else {
          msg = error.data.message
        }
        commit('SET_SNACKBAR_SETING',{ msg , color:'yellow'}, { root: true });
        throw error
      })
    },
    LOGOUT({commit}){
      commit('SET_USER' , null);
      commit('SET_AUTHTOKEN' , null);
      api.setAuthInHeader(null);
    }

  }
}

export default authStore;