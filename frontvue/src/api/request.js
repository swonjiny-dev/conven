import axios from 'axios'

//const DOMAIN = 'http://localhost:5000/';
const DOMAIN = '/'; // 배포시 변경함

const request = (method, url, data) => {
  return axios({
      method, 
      url: DOMAIN + url, 
      data
  },{
    withCredentials: true, 
  }).then(result => {
    return result.data
  }
  )
  .catch(result => { 
      throw result.response
  })
}

// 스트리머 정보목록(닉네임, 아이디, 생방송유무)
export const streamerInfo = {
  list(name){        
     return request('get' , `api/twitch/list/${name}`)
  }
} 

// 편의점 상품목록 구하기 -- 이부분은 store 에서 직접 호출 - 다양한 방법 
export const convenInfo = {
  productList(payload){
    return request('post' , 'api/conven/list',payload)
  }
}