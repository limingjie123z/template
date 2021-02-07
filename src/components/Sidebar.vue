<template>
	<div v-if="navlist" class="sidebar_box clearfix">
		<div v-for="(i, index) in navlist" :key="index">
			<div class="list subset " v-if="i.menus && i.menus.length > 0">
				<div @click="dropDown(index)" :style="{backgroundColor:sub_tit_active[index] ?'#000c19':''}" style="padding: 0 1.25rem 0 1.5625rem;">
					<i style="margin-right: 1.25rem;font-size: 1.25rem;" class="iconfont" :class="i.iconLabel"></i>
					<span>{{ i.menuName }}</span>
					<i style="float: right;line-height: 3.125rem;" :class="
              subset_active[index]
                ? 'el-icon-arrow-down'
                : 'el-icon-arrow-right'
            "></i>
				</div>
				<div :style="{ height: subset_active[index] ? 'auto' : '0' }" style="font-size: 0.875rem;"
				 class="list_subset">
					<div style="height: 3.25rem;padding: 0 1.25rem 0 4rem;" :style="{ color: active === item.path+'?'+item.backMenuId ? '#1884e0' : '#fff' ,backgroundColor: active === item.path+'?'+item.backMenuId ? '#1884e059':'#000c19'}" @click="tjump(item, index)"
					 v-for="(item, ind) in i.menus" :key="ind">
						<!-- <i style="margin-right: 1.25rem;font-size: 1.25rem;" class="iconfont" :class="item.iconLabel"></i> -->
						<div style="display: inline-block;text-align: justify;min-width: 3.5rem;">{{ item.menuName }}<span style="padding-left: 100%;display: inline-block;"></span></div>
					</div>
				</div>
			</div>
			<div @click="ojump(i)" :class="i.path+'?'+i.backMenuId === active ? 'active1' : ''" style="padding: 0 1.25rem 0 1.5625rem;" class="list"
			 v-else>
				<i style="margin-right: 1.25rem;font-size: 1.25rem;" class="iconfont" :class="i.iconLabel"></i>
				<span>{{ i.menuName }}</span>
				<i style="float: right;line-height: 3.125rem;" class="el-icon-arrow-right"></i>
			</div>
		</div>
		
		<!-- <div class="taeback">
			<i @click="bordow()" class="iconfont iconshouhui" style="font-size: 1.375rem;"></i>
		</div> -->
	</div>
</template>

<script>
	export default {
		props:["bordow"],
		computed: {
			isFollow() {
				return this.$store.getters.g_sidebarlist; //需要监听的数据
			}
		},
		watch: {
			active: function(a) {
				// console.log(a)
				let arr = [];
				this.navlist.forEach((item, index) => {
					arr.push(false);
				});
				this.sub_tit_active = arr;
				this.navlist.forEach((item, index) => {
					if (item.menus && item.menus.length > 0) {
						item.menus.forEach(i => {
							if (i.path+'?'+i.backMenuId === this.active) {
								this.$set(this.sub_tit_active, index, true);
							}
						});
					}
				});
				// console.log(this.sub_tit_active)
			},

			$route(to) {
				if(this.active!==window.location.hash.slice(1)){
					this.active = window.location.hash.slice(1);
				}

				// let arr = [];
			},

			isFollow(newVal) {
				// if (document.cookie && this.$store.getters.g_perInfor && this.$store.getters.g_perInfor.currentUserType) {
				if (document.cookie) {
					// this.$http.get(`${this.$store.getters.g_url}/role/roleMenu1/${this.getCookie('userId')}`).then(res=>{
					// 	if(res.data.code==200){
							this.$store.dispatch("a_settabs", [{
								path: "/",
								menuName: "主页"
							}]);
							this.navlist = this.$store.getters.g_sidebarlist;
							// this.$store.dispatch("a_sidebarlist", res.data.t.backMenu.menus);
							// console.log(this.navlist);
							this.act();
						// }
					// })
				} 
			}
		},
		data() {
			return {
				navlist: [],
				active: "/",
				subset_active: [],
				sub_tit_active: []
			}
		},
		mounted() {
			if (this.$store.getters.g_sidebarlist) {
				// this.$http.get(`${this.$store.getters.g_url}/role/roleMenu1/${this.getCookie('userId')}`).then(res=>{
				// 	if(res.data.code==200){
						this.$store.dispatch("a_settabs", [{
							path: "/",
							menuName: "主页"
						}]);
						this.navlist = this.$store.getters.g_sidebarlist;
						// this.$store.dispatch("a_sidebarlist", res.data.t.backMenu.menus);
						// console.log(this.navlist);
						this.act();
					// }
				// })
			} 
			// role/roleMenu1
			if(false){
			this.$http.get(`${this.$store.getters.g_url}/role/roleMenu1/${this.getCookie('userId')}`).then(res=>{
				if(res.data.code==200){
					this.$store.dispatch("a_settabs", [{
						path: "/",
						menuName: "主页"
					}]);
					this.navlist = res.data.t.backMenu.menus;
					this.$store.dispatch("a_sidebarlist", res.data.t.backMenu.menus);
					// console.log(this.navlist);
					this.act();
				}
			})
			}
		},
		methods: {
			// //获取cookie
			// 	getCookie(cookieName) {
			// 	  const strCookie = document.cookie
			// 	  const cookieList = strCookie.split(';')
				  
			// 	  for(let i = 0; i < cookieList.length; i++) {
			// 	    const arr = cookieList[i].split('=')
			// 	    if (cookieName === arr[0].trim()) {
			// 	      return arr[1]
			// 	    }
			// 	  }
				  
			// 	  return ''
			// 	},
			restore(a) {
				this.subset_active.forEach((item, index) => {
					a + item;
					this.$set(this.subset_active, index, false);
				});
			},
			ojump(a) {
				let arr = this.$store.getters.g_settabs;
				let type = true;
				this.$store.getters.g_settabs.forEach(item => {
					if (item.path === a.path+'?'+a.backMenuId) {
						type = false;
					}
				});
				if (type) {
					arr.push({
						menuName: a.menuName,
						path: a.path+'?'+a.backMenuId
					});
					this.$store.dispatch("a_settabs", arr);
				}
				this.restore(a);
				this.active = a.path+'?'+a.backMenuId;
				if (a.path+'?'+a.backMenuId !== window.location.hash.slice(1)) {
					this.$router.push(a.path+'?'+a.backMenuId);
				}
				// console.log(this.active)
				// this.$store.dispatch("a_newsin", false);
				// this.$store.dispatch("a_whetheractive", true);
				// this.$store.dispatch("a_bidisShow", 1);
				// this.$store.dispatch("a_bidProjectactive", 0);
			},
			tjump(a, b) {
				let arr = this.$store.getters.g_settabs;
				let type = true;
				this.$store.getters.g_settabs.forEach(item => {
					if (item.path ===  a.path+'?'+a.backMenuId) {
						type = false;
					}
				});
				if (type) {
					arr.push({
						menuName: a.menuName,
						path: a.path+'?'+a.backMenuId
					});
					this.$store.dispatch("a_settabs", arr);
				}
				this.active = a.path+'?'+a.backMenuId;
				if (a.path+'?'+a.backMenuId !== window.location.hash.slice(1)) {
					this.$router.push(a.path+'?'+a.backMenuId);
				}
				// console.log(this.active)
				// this.$store.dispatch("a_newsin", false);
				// this.$store.dispatch("a_whetheractive", true);
				// this.$store.dispatch("a_bidisShow", 1);
				// this.$store.dispatch("a_bidProjectactive", 0);
			},
			dropDown(a) {
				if (this.subset_active[a]) {
					this.$set(this.subset_active, a, !this.subset_active[a]);
				} else {
					this.restore(a);
					this.$set(this.subset_active, a, !this.subset_active[a]);
				}
			},
			act() {
				this.active = window.location.hash.slice(1);
				let types = true;
				this.navlist.forEach((item, index) => {
					this.sub_tit_active.push(false);

					let arr = this.$store.getters.g_settabs;
					if (item.menus && item.menus.length > 0) {
						types = false;
						let type = false;
						item.menus.forEach(i => {
							if (i.path+'?'+i.backMenuId === this.active) {
								type = true;
								// console.log(i.path+'?'+i.backMenuId ,this.$store.getters.g_settabs[0].path)
								if (i.path+'?'+i.backMenuId !== this.$store.getters.g_settabs[0].path) {
									arr.push({
										menuName: i.menuName,
										path: i.path+'?'+i.backMenuId
									});
								}
								this.$store.dispatch("a_settabs", arr);
							}
						});

						this.subset_active.push(type);
					} else {
						if (this.active === item.path+'?'+item.backMenuId) {
							// this.$set(this.subset_active,index,true)
							this.subset_active.push(true);
							if (item.path+'?'+item.backMenuId !== this.$store.getters.g_settabs[0].path) {
								arr.push({
									menuName: item.menuName,
									path: item.path+'?'+item.backMenuId
								});
							}
							this.$store.dispatch("a_settabs", arr);
						} else {
							this.subset_active.push(false);
						}
					}
				});

			}
		}
	};
</script>

<style scoped lang="scss">
	.sidebar_box {
		// width: 100%;
		width: 12.5rem;
		height: 100%;
		font-size: 1rem;
		background-color: #001327;
		box-shadow: 0px 0.25rem 0.8125rem 0.0625rem rgba(46, 43, 41, 0.2);
		color: #fff;
		overflow:auto;
		position: absolute;
		.taeback{
			width: 100%;
			height: 3.125rem;
			border-top: 0.0625rem #1d2b3a solid;
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 0.5rem 1.25rem;
			box-sizing: border-box;
			i{
				cursor: pointer;
			}
		}
		.list {
			line-height: 3.125rem;
			// padding: 0 1.25rem 0 1.5625rem;
			font-size: 1rem;
			cursor: pointer;

			.list_subset {
				// height: 0;
				
				overflow: hidden;
			}
		}

		.subset {
			padding: none;
		}

		.active1 {
			background-color: #1884e059;
			color: #1884e0;
		}
	}
</style>
