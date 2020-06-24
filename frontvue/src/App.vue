<template>
	<v-app>
		<AppBar></AppBar>
		<v-content class="mb-12">
			<router-view></router-view>
		</v-content>
		<AppFooter></AppFooter>
    <v-snackbar
      v-model="snackbarFlag"
   
      top
    >
      {{ snackbarMsg }}
      <v-btn
        :color="snackbarColor"
        text
        @click="SET_SNACKBAR_INIT()"
      >
      Close
      </v-btn>
    </v-snackbar>
	</v-app>
</template>

<script>
import AppBar from "./components/layout/AppBar";
import AppFooter from "./components/layout/AppFooter";
import { mapMutations } from "vuex";

export default {
  name: 'App',
  components: {
    AppBar,
    AppFooter
  },
  computed: {
    snackbarMsg : {
      get(){
        return this.$store.state.snackbarMsg;
      },
      set(){
        this.$store.state.snackbarMsg = '';
      }
    },
    snackbarFlag : {
      get(){
        return this.$store.state.snackbarFlag;
      },
      set(){}
    },
    snackbarColor : {
      get(){
        return this.$store.state.snackbarColor;
      },
      set(){
        this.$store.state.snackbarMsg = 'white';
      }
    },

  },
  data: () => ({
  
  }),
  methods: {
    ...mapMutations([
      'SET_SNACKBAR_SETING',
      'SET_SNACKBAR_INIT',
    ])
  },
};
</script>
<style>
  /* 트랜젝션이용시 사용 */
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
