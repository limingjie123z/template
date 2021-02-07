<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		data() {
			return {
				times: null
			};
		},
		computed: {
			loginstatus() {
				return this.$store.getters.g_loginstatus;
			}
		},
		watch: {
			loginstatus: function() {
				if (window.localStorage.time && this.$store.getters.g_loginstatus) {
					this.timse();
				} else {
					clearInterval(this.times);
				}
			}
		},
		mounted() {},
		methods: {
			timse() {
				//   this.times = setInterval(() => {
				//     let curttime = this.time();
				//     let timess = new Date(window.localStorage.time);
				//     if (curttime.getTime() > timess.getTime()) {
				//       console.log("退出");
				// clearInterval(this.times)
				//       this.clearAllCookie();
				//     }
				//   }, 100);
			},
			clearAllCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if (keys) {
					for (var i = keys.length; i--;)
						document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
				}
				this.$router.push("/login");
			},
			time() {
				var xhr = null;
				if (window.XMLHttpRequest) {
					xhr = new window.XMLHttpRequest();
				} else {
					// ie
					xhr = new ActiveObject("Microsoft");
				}
				xhr.open("GET", "/", false); //false不可变
				xhr.send(null);
				var date = xhr.getResponseHeader("Date");
				return new Date(date);
			}
		}
	};
</script>
<style lang="scss">
	body::-webkit-scrollbar {
		display: none;
	}

	html {
		-ms-scroll-chaining: chained;
		-ms-overflow-style: none;
		-ms-content-zooming: zoom;
		-ms-scroll-rails: none;
		-ms-content-zoom-limit-min: 100%;
		-ms-content-zoom-limit-max: 500%;
		-ms-scroll-snap-type: proximity;
		-ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
		-ms-overflow-style: none;
		overflow: auto;
	}

	* {
		margin: 0;
		padding: 0;
	}

	.viewer-footer {
		bottom: 2.5rem;
	}


	input {
		background: none;
		outline: none;
		border: 1px solid #ccc;
	}

	#app {
		position: fixed;
		background-color: #f9f9f9;
		width: 100%;
		height: 100%;
	}

	// 清浮动
	.clearfix {
		*zoom: 1 !important;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		line-height: 0;
		content: "";
	}

	.clearfix:after {
		clear: both;
	}
</style>
