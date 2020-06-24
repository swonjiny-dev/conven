<template>
  <v-app-bar
		app
		color="deep-purple"
		dark
  >
	 	<v-btn text href="/conven">편의점</v-btn>
			<!-- 멀티스위치 관련 embed 변경정책 보고 수정하거나 삭제함 - 보안관련 인증이 추가된듯 -->
		  <!-- <v-btn text href="/twitch">멀티트위치</v-btn> -->
		<v-btn v-if="IS_AUTH" text href="/conEdit">상품수정</v-btn>
		<v-btn v-if="!IS_AUTH" text href="/login">로그인</v-btn>
		<v-btn v-if="IS_AUTH" text @click.prevent="logoutEvent" >로그아웃</v-btn>
  </v-app-bar>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters('authStore',[
      'IS_AUTH'
    ]),
	},
	methods: {
		...mapActions('authStore',[
      'LOGOUT'
		]),
		logoutEvent(){
			this.LOGOUT();
			if (this.$route.path !== '/conven')this.$router.push('/coven');
		}
	},
}
</script>

<style>

</style>