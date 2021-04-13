import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueVideoPlayer,
	/* {
  options: global default options,
  events: global videojs events
} */
)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
	router: router,
	data: function() {
		return {
			USER: [{
				name: null,
				email: null,
				id: null,
				confirmed: false
			}]
		}
	},
	render: h => h(App),
}).$mount('#app')
