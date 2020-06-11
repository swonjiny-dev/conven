<template>
  <v-card
  class="pa-2 mt-1"
  outlined
  dense
  >
      <v-select
      v-model="categorySelect"
      :items="category"
      label="품목을 선택하세요"
      multiple
      dense
      chips
      
      @change="clickEvent"
      >
        <template v-slot:prepend-item>
          <v-list-item
            ripple
            @click="toggle"
          >
            <v-list-item-action>
              <v-icon :color="categorySelect.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>전체선택</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
        
      </v-select>
 
  </v-card>
</template>

<script>
export default {
 
  data() {
    return {
      categorySelect : [],
      category : ['음료' ,'간편식사' , '과자류', '생활용품',  '식품',  '아이스크림', '즉석조리' ]
    }
  },
  computed: {
    selectedAllShop () {
      return this.categorySelect.length === this.category.length
    },
    selectedSomeShop () {
      return this.categorySelect.length > 0 && !this.selectedAllShop
    },
    icon () {
      if (this.selectedAllShop) return 'mdi-close-box'
      if (this.selectedSomeShop) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },

  methods: {
    toggle(){
      this.$nextTick(() => {
        if (this.selectedAllShop) {
          this.categorySelect = []
        } else {
          this.categorySelect = this.category.slice()
        }
        this.$emit('categoryEvent',this.categorySelect);
      })
    },
    clickEvent(){
      this.$emit('categoryEvent',this.categorySelect);
      
    }
  },
}
</script>

<style>

</style>