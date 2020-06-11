<template>
  <v-card height="260" class="d-flex justify-center align-center" @click="btnEvent">
    <v-btn icon x-large>
      <v-icon>mdi-view-grid-plus-outline</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  methods: {
    btnEvent(){
      this.$emit('addBtn');
    }
  },
}
</script>

<style>

</style>