import axios from 'axios'

const DOMAIN = 'http://localhost/';
//const DOMAIN = '/'; // 배포시 변경함

const request = (method, url, data) => {
  return axios({
      method, 
      url: DOMAIN + url, 
      data
  },{
    withCredentials: true, 
  }).then(res => {
    return res.data
  })
  .catch(res => { 
      throw res.response
  })
}
// 헤더에 인증키 입력
export const setAuthInHeader = token => {
  console.log(11111);
  console.log(token);
  
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

// 스트리머 정보목록(닉네임, 아이디, 생방송유무)
export const streamerInfo = {
  list(name){        
     return request('get' , `api/twitch/list/${name}`)
  }
} 

// 편의점 상품목록 구하기 -- 이부분은 store 에서 직접 호출 - 다양한 방법 
export const convenInfo = {
  // 상품목록조회
  productList(payload){
    return request('post' , 'api/conven/list',payload)
  },
  // 카테고리 정보 수정
  updateCategory(id, category){
    
    return request('patch' , `api/conven/category/${id}`,{category})
  }
}

// 로그인 세션관리
export const auth = {
  login(email, password){
    return request('post' , 'api/user/getAuthKey' ,{email, password});
  }
}