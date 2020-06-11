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
      <addCard v-if="addBtnflag" @addBtn='addBtn'/>
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
import searchBottom  from "@/components/conven/searchBottom.vue";
import itemCard  from "@/components/conven/itemCard.vue";
import addCard  from "@/components/conven/addCard.vue";
import { mapMutations , mapActions } from 'vuex'
export default {
  created() {
    document.title = "편의점";
    this.plist();
  },
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
    addBtnflag(){
      if(this.$store.state.convenStore.productList.length === this.$store.state.convenStore.prodTotal ){
        return false
      }else return true
    },
    productList(){
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
    ...mapMutations('convenStore' , [
      'SET_STATE_INIT'
    ]),

    ...mapActions('convenStore' ,{
      plist : 'FETCH_PRODUCT_LIST'}
    ),
    searchBtnEvent(payload){
     // this.hidden=false;
      this.payload = payload;
      this.SET_STATE_INIT();
      this.sheet=false;
      this.plist(payload);
    },

    searchBtnEvent2(){
      this.sheet=true;
    },
    // 더보기&페이징 10개씩 가져온다.
    addBtn(){
      if(this.$store.state.convenStore.prodTotal!==0 && this.$store.state.convenStore.prodTotal > this.payload.offset){
       this.payload.offset+=10;
       this.plist(this.payload);
      }else return;
    }
  },
}
</script>

<style>

</style>