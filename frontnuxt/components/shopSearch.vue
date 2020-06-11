<template>
  <v-card
  class="pa-1"
  outlined
  dense
  >

      <v-select
      v-model="shopSelect"
      :items="shopItems"
      item-text="title"
      item-value="value"
      label="편의점을 선택하세요"
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
              <v-icon :color="shopSelect.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
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
      shopSelect : [],
      shopItems : [
        {title : 'CU' , value : 'cu'},
        {title : 'GS25' , value : 'gs'},
        {title : '이마트24' , value : 'emart24'},
        {title : '세븐일레븐' , value : 'seven'},
        {title : '미니스톱' , value : 'mini'} 
      ]
    }
  },
  computed: {
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
    },
  },

  methods: {
    toggle(){
      this.$nextTick(() => {
        if (this.selectedAllShop) {
          this.shopSelect = []
        } else {
          this.shopSelect = this.shopItems.map((item)=>{
            return item.value
          })
        }
        this.$emit('shopEvent',this.shopSelect);
      })
    },
    clickEvent(){
      this.$emit('shopEvent',this.shopSelect);
      
    }
  },
}
</script>

<style>

</style>