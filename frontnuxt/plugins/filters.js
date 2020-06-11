import Vue from 'vue'
// 금액표시로 변경하기
Vue.filter('currency', val => {
	if (!val) return ''
	return val.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")+"원";
})
