export const state = () => ({
  productList : [],
  prodTotal :0,
});

export const mutations = {
  setProductList(state , list){
    state.productList = state.productList.concat(list);
  },
  setProductTotal(state , total){
    
    state.prodTotal = total;
  },
  // 초기화
  setStateInit(state){
    state.productList=[];
    state.prodTotal=0;
  }
};

export const actions = {
  // 서버에서 상품목록을 가젼온다
  async productList({commit} , payload){
    try {
      const res = await this.$axios.post('http://localhost:5000/api/conven/list',{
        brand : payload.brand,
        category : payload.category,
        brand : payload.brand,
        eventType : payload.eventType,
        title : payload.title,
        size : payload.size,
        offset : payload.offset,
        order : payload.order,
      },{
          withCredentials: true, 
      });

      commit('setProductList' , res.data.rows);
      commit('setProductTotal' , res.data.count);
    } catch (error) {
      console.error(error);
    }
  }
};