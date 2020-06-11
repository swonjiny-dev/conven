import * as api from "../api/request";

const twitchStore = {
  namespaced: true,
  state : {
    streamerList : [],
    layout : [
      {"x":0,"y":0,"w":3,"h":2,"i":"insert" , "streamer" : "" , "option" : ""},
    ],
    streamFollowChart : {
      title : '호출명',
      labels : ['11' , '22'],
      dataset : [{
        label: '스트리머이름',
        borderColor: '#FC2525',
        pointBackgroundColor: 'red',
        borderWidth: 1,
        pointBorderColor: 'blue',
        data: [40, 39]
      }]
    }
  },
  mutations : {
    SET_STREAMER_LIST(state , list){
      state.streamerList = list;
    },
    SET_LAYOUT(state , item){
      state.layout.push(item);
    },
    REMOVE_LAYOUT(state , index){
      state.layout.splice(index,1);
    },
    SET_STREAMER_CHART(state , item){
      let data = {
        label: '스트리머이름',
        borderColor: '#FC2525',
        pointBackgroundColor: 'red',
        borderWidth: 1,
        pointBorderColor: 'blue',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
      state.streamFollowChart.labels = item.data.labels;
      if(item.title) state.streamFollowChart.title = item.title;
      data.label = item.data.userName;
      data.data = item.data.values;
      state.streamFollowChart.dataset.splice(0,1)
      state.streamFollowChart.dataset.push(data)
    }
  },
  actions : {
    // 스트리머 목록 정보 확인
    async FETCH_STREAMER_LIST({ commit } , name){
      try {              
        const list =  await api.streamerInfo.list(name);     
        await commit('SET_STREAMER_LIST' , list);    
      } catch (error) {
        console.error(error);
      }
    },

  }
}

export default twitchStore;