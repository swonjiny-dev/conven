export const conven = {
  computed: {
    productList(){
      try {
        let list = this.$store.state.convenStore.productList;
        if(list){
          list = list.map((item)=>{
            let color = '#fff';
            if(item.brand == 'cu') color = 'purple darken-3';
            if(item.brand == 'gs') color = 'blue darken-2';
            if(item.brand == 'mini') color = 'yellow darken-1';
            if(item.brand == 'emart24') color = 'amber darken-2';
            if(item.brand == 'seven') color = 'green darken-4';
            const reitem = {...item , color }
            return reitem;
          });
        }
        return list;
      } catch (error) {
        console.error(error);
        this.SET_SNACKBAR_SETING('스트리머 정보 조회에 문제가 있습니다.잠시후 시도해 주세요' , 'red');
        return;
      }
    },
  },
}