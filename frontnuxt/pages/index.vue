<template>
<v-container>
  <v-row>
    <v-col 
        cols="12"
        xs="12"
        md="3"
        sm="6"
        v-for="(item, index) in productList " :key="index"
        > 
      <itemCard :item="item" />
    </v-col>
    <v-col 
        cols="12"
        xs="12"
        md="3"
        sm="6"  
        > 
      <addCard @addBtn='addBtn'/>
    </v-col>
  </v-row>
  <v-fab-transition>
    <v-btn
      v-show="!hidden"
      color="pink"
      fab
      dark
      small
      fixed
      bottom
      right
      @click="searchBtnEvent2" >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-fab-transition>
  <searchBottom :sheet='sheet' @searchBtnEvent='searchBtnEvent'  />

</v-container>
  
</template>

<script>
import searchBottom  from "~/components/searchBottom.vue";
import itemCard  from "~/components/itemCard.vue";
import addCard  from "~/components/addCard.vue";


export default {
  components : {
    searchBottom,
    itemCard,
    addCard
  },
  data() {
    return {
      hidden: false,
      sheet : false,
      shopSelect : [],
      categorySelect : [],
      payload : {offset:0},
    }
  },

  computed: {
    productList(){
      let list = this.$store.state.conven.productList;
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
    },

    selectedAllShop () {
      return this.shopSelect.length === this.shopItems.length
    },
    selectedSomeShop () {
      return this.shopSelect.length > 0 && !this.selectedAllShop
    },
    icon () {
      if (this.selectedAllShop) return 'mdi-close-box'
      if (this.selectedSomeShop) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },

  methods: {
    categoryEvent(val){
      console.log('여기커테고리 정보' + val);
      
    },
    shopEvent(val){
      console.log('여기상점선택 정보 - ' + val);
    },
    searchBtnEvent(payload){
     // this.hidden=false;
      this.payload = payload;
      this.$store.commit('conven/setStateInit');

      this.sheet=false;
      this.$store.dispatch('conven/productList', payload);
    },

    searchBtnEvent2(){
      this.sheet=true;
    },
    // 더보기&페이징 10개씩 가져온다.
    addBtn(){
      console.log("this.payload.offset :" + this.payload.offset);
      
      if(this.$store.state.conven.prodTotal!==0 && this.$store.state.conven.prodTotal > this.payload.offset){
       this.payload.offset+=10;
       this.$store.dispatch('conven/productList', this.payload);
      }else return;
      
    }

  },
}
</script>

<style>

</style>