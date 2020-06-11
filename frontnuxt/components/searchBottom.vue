<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <v-container>
      <v-card
        class="ma-2"
        outlined
      >
       <v-app-bar
          dark
          color="#1F7087"
        >
          <v-toolbar-title>행사상품 검색</v-toolbar-title>
          <v-spacer></v-spacer>
          
          <v-btn icon @click="searchBtnEvent">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-app-bar>
     
      <v-row class="ma-2">
        <v-text-field 
          v-model="search"
          label="상품명"
        ></v-text-field>
      </v-row>
      <v-row class="ma-2" >
        <v-col cols="12" md="3" xs="12"  sm="6" class="pa-1">
        <v-select
        
        outlined
          v-model="shopSelect"
          :items="shopItems"
          item-text="title"
          item-value="value"
          label="편의점을 선택하세요"
          multiple
          
          chips
    
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="shopSelect.length > 0 ? 'indigo darken-4' : ''">{{ shopIcon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>전체선택</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider ></v-divider>
            </template>
            
          </v-select>
          </v-col>
          <v-col cols="12" md="3" xs="12"  sm="6" class="pa-1">
            <v-select
              outlined
              v-model="plusSelect"
              :items="plusItems"
              label="상품플러스"
              multiple
              
              chips
          
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="togglePlus"
                  >
                    <v-list-item-action>
                      <v-icon :color="shopSelect.length > 0 ? 'indigo darken-4' : ''">{{ plusIcon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>전체선택</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="3" xs="12"  sm="6" class="pa-1">
            <v-select
              outlined
              v-model="categorySelect"
              :items="categoryItems"
              label="상품종류선택"
              multiple
              
              chips
          
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="toggleCategory"
                  >
                    <v-list-item-action>
                      <v-icon :color="categorySelect.length > 0 ? 'indigo darken-4' : ''">{{ categoryIcon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>전체선택</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
            </v-select>
          </v-col>
         <v-col cols="12" md="3" xs="12"  sm="6" class="pa-1">
             <v-select
            outlined
            
            v-model="orderby"
            :items="orderbyItems"
            label="정렬"
            
          >
          </v-select>
          </v-col>
          
        </v-row>
      </v-card>
       </v-container>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props : {
    sheet : {
      type : Boolean,
      default : false
    }
  },

  data() {
    return {
      search : '',
      shopSelect : [],
      shopItems : [
        {title : 'CU' , value : 'cu'},
        {title : 'GS25' , value : 'gs'},
        {title : '이마트24' , value : 'emart24'},
        {title : '세븐일레븐' , value : 'seven'},
        {title : '미니스톱' , value : 'mini'} 
      ],
      plusSelect : [],
      plusItems : ['1+1','2+1','n+1'],
      categorySelect : [],
      categoryItems : ['음료','과자류','간편식사','식품','아이스크림','즉석요리','생활용품'],
      orderby : '',
      orderbyItems : [
        '낮은가격순' ,'높은가격순']
    }
  },
  computed: {
    selectedAllShop () {
      return this.shopSelect.length === this.shopItems.length
    },
    selectedSomeShop () {
      return this.shopSelect.length > 0 && !this.selectedAllShop
    },
    shopIcon () {
      if (this.selectedAllShop) return 'mdi-close-box'
      if (this.selectedSomeShop) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },

    selectedAllPlus () {
      return this.plusSelect.length === this.plusItems.length
    },
    selectedSomePlus () {
      return this.plusSelect.length > 0 && !this.selectedAllPlus
    },
    plusIcon () {
      if (this.selectedAllPlus) return 'mdi-close-box'
      if (this.selectedSomePlus) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    selectedAllcategory () {
      return this.categorySelect.length === this.categoryItems.length
    },
    selectedSomecategory () {
      return this.categorySelect.length > 0 && !this.selectedAllcategory
    },
    categoryIcon () {
      if (this.selectedAllcategory) return 'mdi-close-box'
      if (this.selectedSomecategory) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },

  methods: {
    searchBtnEvent(){
      let payload = {brand:this.shopSelect ,category:this.categorySelect,eventType:this.plusSelect, title:this.search , size : 10,offset:0,order:this.orderby};
      this.$emit('searchBtnEvent',payload);
    },

    toggle(){
      this.$nextTick(() => {
        if (this.selectedAllShop) {
          this.shopSelect = []
        } else {
          this.shopSelect = this.shopItems.map((item)=>{
            return item.value
          })
        }
      
      })
    },
    togglePlus(){
      this.$nextTick(() => {
        if (this.selectedAllPlus) {
          this.plusSelect = []
        } else {
          this.plusSelect = this.plusItems;
        }
      })
    },
    toggleCategory(){
      this.$nextTick(() => {
        if (this.selectedAllcategory) {
          this.categorySelect = []
        } else {
          this.categorySelect = this.categoryItems;
        }
      })
    }
  },
}
</script>

<style>

</style>