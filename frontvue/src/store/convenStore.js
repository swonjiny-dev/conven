import * as api from "../api/request";

const convenStore = {
  namespaced: true,
  state: {
    productList : [],
    prodTotal :0,
  },
  gatters:{
    addBtnFlag : (state)=>{
      if(state.productList.length === state.prodTotal ){        
        return false
      }else{
        return true
      } 
    }
  },
  mutations: {
    SET_PRODUCT_LIST(state , list){
      state.productList = state.productList.concat(list);
    },
    SET_PRODUCT_TOTAL(state , total){
      state.prodTotal = total;
    },
    // 초기화
    SET_STATE_INIT(state){
      state.productList=[];
      state.prodTotal=0;
    },
  },
  actions: {
    async FETCH_PRODUCT_LIST({commit} , payload){
      try {
        const list = await api.convenInfo.productList(payload);
        commit('SET_PRODUCT_LIST' , list.rows);
        commit('SET_PRODUCT_TOTAL' , list.count);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export default convenStore;