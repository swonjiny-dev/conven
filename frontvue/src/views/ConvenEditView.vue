<template>
  <div>
  <v-simple-table dense >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">편의점</th>
          <th class="text-left">이미지</th>
          <th class="text-left">상품명</th>
          <th class="text-left">이벤트</th>
          <th class="text-left">가격</th>
          <th class="text-left">카테고리</th>
          <th class="text-left">저장유무</th>
        </tr>
      </thead>
      <tbody name="update" is="transition-group">
        <tr v-for="item in productList" :key="item.id" >
          <td>{{ item.brand }}</td>
          <td>
            <v-img :src="item.imageUrl" :aspect-ratio="1" height="50"></v-img>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.eventType }}</td>
          <td>{{ item.price | currency }}</td>
          <td>
            <v-select
              dense
              :items="categoryItems"
              v-model ="item.category"
            ></v-select>
          </td>
          <td><v-btn class="ma-2" outlined color="indigo" @click="saveEvent(item)">저장</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length='pageTotal'
      :total-visible="5"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"

    ></v-pagination>
  </div>
  <v-fab-transition>
    <v-btn
      color="red"
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
  </div>
</template>

<script>
import { conven } from "@/mixins/conven";
import { mapState, mapMutations , mapActions } from 'vuex'
import searchBottom  from "@/components/conven/searchBottom.vue";
export default {
  mixins: [conven],
  created() {
    document.title = "편의점상품정보카테고리편집";
    this.page = 1;
    this.size = 20;
    this.SET_STATE_INIT();
    this.FETCH_PRODUCT_LIST(this.payload);
  },
  components : {
    searchBottom,

  },
  computed: {
    ...mapState('convenStore',[
      'prodTotal'
    ]),
    pageTotal(){
      return Math.ceil(this.prodTotal / this.size)
    }
  },
  watch: {
    page(){
      this.payload.offset = (this.page-1) * this.size;
      if(this.payload.offset < 0) this.payload.offset = 0;
      this.SET_STATE_INIT();
      this.FETCH_PRODUCT_LIST(this.payload);
    }
  },

  data() {
    return {
      page : 1,
      size : 20,
      sheet : false,
      payload : {brand:this.shopSelect ,category:this.categorySelect,eventType:this.plusSelect, title:this.search , size : 20,offset:0,order:this.orderby},
      categoryItems : ['음료','과자류','간편식사','식품','아이스크림','즉석요리','생활용품'],
    }
  },
  methods: {
    ...mapMutations('convenStore' , [
      'SET_STATE_INIT'
    ]),
    ...mapMutations([
      'SET_SNACKBAR_SETING',
    ]),
    ...mapActions('convenStore' ,[
      'FETCH_PRODUCT_LIST',
      'PATCH_CATEGORY']
    ),
    saveEvent(item){
      this.PATCH_CATEGORY(item);
    },

    searchBtnEvent(payload){
     // this.hidden=false;
      this.SET_STATE_INIT();
      this.page = 1;
      payload.size = this.size;
      this.payload = payload;
      this.sheet=false;
      this.FETCH_PRODUCT_LIST(payload);
    },
    searchBtnEvent2(){
      this.sheet=true;
    },
  },
}
</script>

<style>
.update-enter-active {
  transition: all .5s ease-in;
}

.update-leave-active {
  transition: all .5s ease-out;
}

.update-enter, .update-leave-to {
  opacity: .5;
  background-color: #00b383;
}
</style>