<template>
	<div style="height: 100%;">
		<el-container style="height: 100%;">
			<el-header style="height: 5rem;">
				<Header />
			</el-header>
			<el-container class="conta">
				<el-aside width="12.5rem" style="padding-top: 0.625rem;">
					<Sidebar :bordow="bordow" />
				</el-aside>
				<el-container>
					<el-header style="height: 3.75rem;">
						<TabHeader />
					</el-header>
					<el-main style="padding: .625rem 1.25rem 0 1.25rem;">
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
		</el-container>

		<!-- 个人信息 -->
		<el-dialog title="个人信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"><span v-if="$store.getters.g_perInfor">
				<el-form label-width="100px">
					<el-row class="looks">
						<el-col :span="12">
							<el-form-item label="用户名：">
								<div class="look">
									{{ $store.getters.g_perInfor.username }}
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号：">
								<div class="look">
									{{ $store.getters.g_perInfor.mobile }}
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="looks">
						<el-col :span="12">
							<el-form-item label="所属角色：">
								<div class="look">
									{{ $store.getters.g_perInfor.post }}
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属部门：">
								<div class="look">
									{{ $store.getters.g_perInfor.deptName }}
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="looks">
						<el-col :span="12">
							<el-form-item label="所属身份：">
								<div class="look">
									{{ $store.getters.g_perInfor.roleName }}
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="looks">
						<el-col :span="12">
							<el-form-item label="头像：">
								<img :src="$store.getters.g_perInfor.userName" class="Exhibit" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="reject()">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<!-- 绑定CA -->
		<el-dialog title="绑定CA" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose"><span>
				<el-form v-if="$store.getters.g_perInfor" label-width="120px">
					<el-row class="looks">
						<el-form-item label="证书序列号：">
							{{ $store.getters.g_perInfor.username }}
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="证书主题：">
							{{ $store.getters.g_perInfor.post }}
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="颁发时间：">
							{{ $store.getters.g_perInfor.roleName }}
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="有效开始日期：">
							{{ $store.getters.g_perInfor.roleName }}
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="有效截止日期：">
							{{ $store.getters.g_perInfor.roleName }}
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="证书颁发机构：">
							{{ $store.getters.g_perInfor.roleName }}
						</el-form-item>
					</el-row>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary">绑 定</el-button>
				<el-button type="primary" @click="reject()">解 绑</el-button>
			</span>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogVisible2" width="30%" :rules="rules" :before-close="handleClose"><span>
				<el-form :model="form" label-width="100px">
					<el-row class="looks">
						<el-form-item label="原密码：" prop="oldPwd">
							<el-input v-model="form.oldPwd" placeholder="请输入原密码"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="新密码：" prop="newPwd">
							<el-input v-model="form.newPwd" placeholder="新密码"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="looks">
						<el-form-item label="确认密码：" prop="againPwd">
							<el-input v-model="form.againPwd" placeholder="请再次输入新密码"></el-input>
						</el-form-item>
					</el-row>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="reject()">确认修改</el-button>
				<el-button @click="dialogVisible2 = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Sidebar from "../components/Sidebar"; // 侧边栏
	import TabHeader from "../components/TabHeader"; // tab导航
	import Header from "../components/Header"; // 页面head
	export default {
		components: {
			Sidebar,
			TabHeader,
			Header,
		},
		watch: {
			$route(to) {
				if (to.path === "/") {
					this.typses = false;
				} else {
					console.log(11);
					this.typses = true;
				}
			},
		},
		data() {
			var checkPwd = (rule, value, callback) => {
				if (
					/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{12,20}$/.test(value) ==
					false
				) {
					callback(new Error("密码必须为12-20位的数字、字母和特殊字符的组合"));
				} else {
					callback();
				}
			};
			var checkPwd2 = (rule, value, callback) => {
				if (value !== this.form.newPwd) {
					callback(new Error("两次密码不一致"));
				} else {
					callback();
				}
			};
			return {
				asidewidth: "12.5rem",
				// username: "",
				type: "",
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				form: {},
				typses: true,
				logintype: false,
				tablist: [],
				rules: {
					newPwd: [{
							required: true,
							message: "请输入新密码",
							trigger: "blur"
						},
						{
							validator: checkPwd,
							trigger: "blur"
						},
					],
					oldPwd: [{
						required: true,
						message: "请输入原密码",
						trigger: "blur"
					}],
					againPwd: [{
							required: true,
							message: "请再次输入新密码",
							trigger: "blur"
						},
						{
							validator: checkPwd2,
							trigger: "blur"
						},
					],
				},
			};
		},
		mounted() {
			this.username = this.getCookie("username");
			if (this.$route.path === "/") {
				this.typses = false;
			}
			this.$store.dispatch("a_loginstatus", true);
			this.logintype = true;
		},
		methods: {
			//获取用户所有身份
			switchTypelsit() {
				this.$http
					.post(
						`${this.$store.getters.g_url}/switchType?userId=${this.$store.getters.g_perInfor.userId}`
					)
					.then((res) => {
						if (res.data.code == 200) {
							this.tablist = [];
							let ass = res.data.data;
							ass.forEach((item) => {
								if (item == 1) {
									this.tablist.push({
										name: "平台管理员",
										type: item,
									});
								} else if (item == 2) {
									this.tablist.push({
										name: "代理机构",
										type: item,
									});
								} else if (item == 3) {
									this.tablist.push({
										name: "招标人",
										type: item,
									});
								} else if (item == 4) {
									this.tablist.push({
										name: "投标人",
										type: item,
									});
								} else if (item == 5) {
									this.tablist.push({
										name: "专家",
										type: item,
									});
								}
							});
							console.log(this.tablist);
						}
					});
			},
			//切换身份
			tabs(a) {
				if (a.type !== this.$store.getters.g_perInfor.currentUserType) {
					this.$http
						.post(
							`${this.$store.getters.g_url}/switchType?username=${this.$store.getters.g_perInfor.username}&type=${a.type}`
						)
						.then((res) => {
							if (res.data.msg === "OK") {
								document.cookie = "Authentication=" + res.body.data.token;
								// this.$router.push("/");
								if (this.$route.path === "/") {
									window.location.reload();
								} else {
									window.location.href = window.location.host;
								}
							} else {
								this.open3(res.data.msg);
							}
						});
				} else {
					this.open("当前已是改身份");
				}
			},
			bordow() {
				if (this.asidewidth == "3.625rem") {
					this.asidewidth = "12.5rem";
					this.$store.dispatch("a_sidebartype", true);
				} else {
					this.asidewidth = "3.625rem";
					this.$store.dispatch("a_sidebartype", false);
				}
			},
			//获取个人信息
			fetchPerInfor() {
				this.$http.get(`${this.$store.getters.g_url}/user/detail`).then((res) => {
					if (res.body !== null) {
						this.$store.dispatch("a_perInfor", res.body);
						// let ass=res.data.type.split(',')
						// console.log(ass)
						// ass.forEach(item=>{
						// 	if(item==1){
						// 		this.tablist.push({
						// 			name:'平台管理员',
						// 			type:item
						// 		})
						// 	}else if(item==2){
						// 		this.tablist.push({
						// 			name:'代理机构',
						// 			type:item
						// 		})
						// 	}else if(item==3){
						// 		this.tablist.push({
						// 			name:'招标人',
						// 			type:item
						// 		})
						// 	}else if(item==4){
						// 		this.tablist.push({
						// 			name:'投标人',
						// 			type:item
						// 		})
						// 	}else if(item==5){
						// 		this.tablist.push({
						// 			name:'专家',
						// 			type:item
						// 		})
						// 	}
						// })
						if (!this.$store.getters.g_perInfor.currentUserType) {
							this.$store.dispatch("a_settabs", [{
								path: "/componyMsg",
								name: "企业信息",
							}, ]);
							if (this.$route.path !== "/componyMsg") {
								this.$router.push("/componyMsg");
							}
						}
						let arr = {};
						this.$store.getters.g_perInfor.permissions.forEach((item) => {
							let ass = item.split(":");
							if (arr[ass[0]]) {
								arr[ass[0]].push(ass[1]);
							} else {
								arr[ass[0]] = [ass[1]];
							}
						});
						this.$store.dispatch("a_buttons", arr);
						this.switchTypelsit();
					}
				});
			},

			//个人信息
			pinformation() {
				this.dialogVisible = true;
			},
			//绑定CA
			handleCa() {
				this.dialogVisible1 = true;
			},
			//修改密码
			handleEdit() {
				this.dialogVisible2 = true;
			},
			handleClose() {
				this.dialogVisible = false;
				this.dialogVisible1 = false;
				this.dialogVisible2 = false;
			},

			time() {
				var xhr = null;
				if (window.XMLHttpRequest) {
					xhr = new window.XMLHttpRequest();
				} else {
					xhr = new ActiveObject("Microsoft");
				}
				xhr.open("GET", "/", false); //false不可变
				xhr.send(null);
				var date = xhr.getResponseHeader("Date");
				return new Date(date);
			},
			reject() {
				this.form.username = this.getCookie("username");
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$http
							.put(`${this.$store.getters.g_url}/user/pwd`, this.form)
							.then((res) => {
								this.$loading.close();
								if (res.data.code == 200) {
									this.$message.success("密码修改成功");
									this.logout();
								} else {
									this.$message.error(res.data.msg);
								}
							});
					}
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.el-header {
		padding: 0;
	}

	.el-aside {}

	.el-main {
		color: #333;
		padding: 0;
		box-sizing: border-box;
	}

	.conta {
		position: absolute;
		width: 100%;
		top: 5rem;
		bottom: 0;
	}

	// .box {
	// 	min-height: 100vh;
	// }

	// .head_box {
	// 	overflow: hidden;
	// 	height: 100%;
	// 	// padding-top: 5rem;
	// 	// box-sizing: border-box;
	// 	box-shadow: 0 0.25rem 0.8125rem 0.0625rem rgb(46 43 41 / 9%);

	// 	.sidebar_box {
	// 		// border-bottom: 1px #de6e31 solid;
	// 		// border-top: 1px #de6e31 solid;
	// 		// border-right: 1px #de6e31 solid;
	// 		// box-sizing: border-box;
	// 		box-shadow: 0px 0.25rem 0.8125rem 0.0625rem rgba(46, 43, 41, 0.2);
	// 	}
	// }

	// .sidbutt {
	// 	width: 1rem;
	// 	height: 5.625rem;
	// 	border-top-right-radius: 5px;
	// 	border-bottom-right-radius: 5px;
	// 	// background: linear-gradient(to right, #f99a66, #fff);
	// 	position: absolute;
	// 	top: 28.4375rem;
	// 	right: -1rem;
	// 	cursor: pointer;
	// 	// border-right: 1px #de6e31 solid;
	// 	// border-top: 1px #de6e31 solid;
	// 	// border-bottom: 1px #de6e31 solid;
	// 	box-sizing: border-box;
	// 	// background-image: url(../assets/lALPGpqNbfIOoV1cEA_16_92.png);
	// 	// background-image: url(../assets/lALPGoGu93CghbBcDw_15_92.png);
	// 	background-size: 100% 100%;
	// }

	// .el-header {
	// 	background-color: #1884e0;
	// 	text-align: center;
	// 	line-height: 5rem;
	// 	padding: 0;
	// 	z-index: 999;
	// }

	// .el-aside {
	// 	color: #333;
	// 	overflow: inherit;
	// }

	// .el-main {
	// 	display: inline;
	// 	height: 100%;
	// 	// max-height: 85vh;
	// 	overflow-y: auto;
	// 	-webkit-box-flex: 1;
	// 	-ms-flex: 1;
	// 	flex: 1;
	// 	-ms-flex-preferred-size: auto;
	// 	flex-basis: auto;
	// 	box-sizing: border-box;
	// 	padding: 0 1.25rem;
	// 	overflow: hidden;
	// 	padding-top: 0.625rem;
	// 	box-shadow: 0 0.25rem 0.8125rem 0.0625rem rgb(46 43 41 / 2%);
	// }

	// .looks {
	// 	padding: 0 1rem;

	// 	.Exhibit {
	// 		width: 2.5rem;
	// 		height: 2.5rem;
	// 		// border-radius: 1.25rem;
	// 	}

	// 	.look {
	// 		border: 0.063rem solid #666666;
	// 		padding-left: 0.625rem;
	// 		box-sizing: border-box;
	// 		border-radius: 0.25rem;
	// 		line-height: 36px;
	// 		height: 2.25rem;
	// 	}
	// }
</style>
