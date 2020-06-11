<template>
  <v-card height="260">
    <v-img
      :src="item.imageUrl"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
      contain
    >
      <v-card-title class="subtitle-1">
        <v-chip
        class="ma-2"
        :color="item.color"
        dark
        small
      >
        {{item.eventType}}
      </v-chip>
      <v-chip
        :color="item.color"
        dark
        small
      >
        {{item.brand}}
      </v-chip>
      <v-chip
        class="ma-2"
        :color="item.color"
        dark
        small
      >
        {{item.price | currency }}
      </v-chip>
      </v-card-title>
    </v-img>
    <v-card-text class="font-weight-bold">
      {{item.title}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props : ['item']
}
</script>

<style>

</style>