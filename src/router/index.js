import Vue from "vue";
// import VueRouter from "vue-router";
import store from "@/store";

// Vue.use(VueRouter);

const routes = [{
		path: "/",
		component: resolve => require(["@/views/Home.vue"], resolve),
		children: [
			// 代理
			{
				path: "/",
				name: "index", // 首页
				component: resolve => require(["@/views/index.vue"], resolve)
			}
		]
	},
	{
		path: "/login", // 账户登录
		name: "login",
		component: resolve => require(["@/views/Login.vue"], resolve)
	},
	{
		path: "/changepwd", //注册
		name: "changepwd",
		component: resolve =>
			require(["@/views/changePwd.vue"], resolve)
	},
	{
		path: "/err", //注册
		name: "404",
		component: resolve =>
			require(["@/views/err.vue"], resolve)
	}
];

const router = new VueRouter({
	// mode: "history",
	// base: process.env.BASE_URL,
	routes
});
router.beforeEach((to, from, next) => {
	function loginout() {
		var keys = document.cookie.match(/[^ =;]+(?=)/g);
		if (keys) {
			for (var i = keys.length; i--;)
				document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
		}

	}
	if (!document.cookie && to.name !== 'login' && to.name !== 'changepwd' && to.name !== '404') {
		loginout()
		if (from.name === 'login') {
			next(false)
		} else {
			next('/login')
		}
	} else if (document.cookie && (to.name === 'login' || to.name === 'changepwd' || to.name === '404')) {
		// loginout()
		next('/')
	} else if (document.cookie) {
		function getCookie(cookieName) {
			const strCookie = document.cookie;
			const cookieList = strCookie.split(";");

			for (let i = 0; i < cookieList.length; i++) {
				const arr = cookieList[i].split("=");
				if (cookieName === arr[0].trim()) {
					return arr[1];
				}
			}
		}
		Vue.http.get(`${store.getters.g_url}/role/roleMenu1/${getCookie('userId')}`).then(res => {
			if (res.data.code == 200) {
				store.dispatch("a_sidebarlist", res.data.t.backMenu.menus);
				console.log(store.getters.g_sidebarlist);
				store.getters.g_sidebarlist.forEach(item=>{
					if(item.menus){
						item.menus.forEach(it=>{
							router.options.routes[0].children.push({
								path: it.path,
								name: it.path.slice(1), 
								component: resolve => require([`@/views/${it.path.slice(1)}.vue`], resolve)
							})
						})
					}else{
								router.options.routes[0].children.push({
						path: item.path,
						name: item.path.slice(1),
						component: resolve => require([`@/views/${item.path.slice(1)}.vue`], resolve)
					})
					}
				})
				next()
			}
		})
	} else {
		next()
	}
})

export default router;
