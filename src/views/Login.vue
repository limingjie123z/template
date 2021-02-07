<template>
  <div class="login_box" @keydown.enter="login()">
    <div class="cen">
      <div class="logo_box">
        <img src="../assets/logo.png" />
      </div>
      <div class="loginwicket">
        <div class="wickethead">请输入登录信息</div>
        <div class="wicketcen">
          <div class="inputbox">
            <i class="iconfont iconyonghuming"></i>
            <input type="text" v-model="logins.username" placeholder="用户名" />
          </div>
          <div class="inputbox">
            <i class="iconfont iconmima"></i>
            <input
              type="password"
              v-model="logins.password"
              placeholder="密码"
            />
          </div>
          <div class="inputbox" style="width: 12.5rem">
            <i class="iconfont iconmima"></i>
            <input
              type="text"
              v-model="logins.captchaCode"
              placeholder="验证码"
            />
          </div>
          <div class="imge" style="background-color: #fff">
            <img @click="getCaptcha()" :src="getCaptchas" />
          </div>
          <div @click="login()" class="loginbuttom">立即登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0, //切换登录方式
      checked: false, //是否保存密码
      logins: {},
      msg: "",
      type: true,
      typearr: [],
      getCaptchas: "",
    };
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    //验证码
    getCaptcha() {
      this.$http
        .get(`${this.$store.getters.g_url}/user/getCaptcha`)
        .then((res) => {
          this.getCaptchas = res.data;
        });
    },
    //登录
    login() {
      if (
        this.logins.username &&
        this.logins.password &&
        this.logins.password
      ) {
        this.$http
          .post(`${this.$store.getters.g_url}/user/checkLogin`, this.logins, {
            emulate: true,
          })
          .then(
            (res) => {
              if (res.body.code == 200) {
                document.cookie = "Authentication=" + res.body.t.token;
                document.cookie = "username=" + res.body.t.username;
                document.cookie = "userId=" + res.body.t.userId;
                console.log(document.cookie);
                this.$router.push("/");
              } else if (
                res.data.msg == "请你修改密码后重新登陆" ||
                res.data.msg ==
                  "从上次修改密码后登陆,到现在已过30天 请你修改密码后重新登录"
              ) {
                //  document.cookie = "Authentication=" + res.body.t.token;
                // document.cookie = "username=" + res.body.t.username;
                // document.cookie = "userId=" + res.body.t.userId;
                this.$confirm(res.data.msg, "提示", {
                  type: "warning",
                  showClose: "false",
                  showCancelButton: "false",
                  closeOnClickModal: "false",
                }).then(() => {
                  document.cookie = "username=" + this.logins.username;
                  this.$router.push("/changepwd");
                });
              } else {
                this.getCaptcha();
                this.open3(res.body.msg);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this.open1("请完善登录信息");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login_box {
  height: 100vh;
  box-sizing: border-box;
  background-image: url(../assets/loginback.png);

  .cen {
    padding-top: 17.75rem;
    .logo_box {
      width: 27.0625rem;
      position: absolute;
      left: 3.5rem;
      top: 2.3125rem;
    }
    .loginwicket {
      width: 37.5rem;
      height: 28.125rem;
      margin: 0 auto;
      padding: 0.875rem;
      background-image: url(../assets/loginwicket.png);
      background-size: 100% 100%;
      box-sizing: border-box;

      .wickethead {
        height: 3.75rem;
        text-align: center;
        line-height: 3.75rem;
        font-size: 1rem;
        color: #fff;
      }

      .wicketcen {
        height: 21.5625rem;
        padding: 2.5rem 5.4rem 1.25rem 5.4rem;
        box-sizing: border-box;
        .inputbox {
          width: 25rem;
          height: 3rem;
          position: relative;
          border-radius: 0.25rem;
          background-color: #40404054;
          margin-bottom: 1.875rem;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          input {
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 0.875rem;
            padding: 0 1.25rem 0 3.75rem;
            box-sizing: border-box;
            border: none;
          }

          i {
            width: 1.5rem;
            height: 1.5rem;
            color: #fff;
            text-align: center;
            line-height: 1.5rem;
            margin-top: -0.75rem;
            position: absolute;
            left: 1.25rem;
            top: 50%;
          }

          input::-webkit-input-placeholder,
          textarea::-webkit-input-placeholder {
            color: #ddd;
          }

          input:-moz-placeholder,
          textarea:-moz-placeholder {
            color: #ddd;
          }

          input::-moz-placeholder,
          textarea::-moz-placeholder {
            color: #ddd;
          }

          input:-ms-input-placeholder,
          textarea:-ms-input-placeholder {
            color: #ddd;
          }
        }

        .imge {
          width: 11.1rem;
          height: 3rem;
          border-radius: 0.25rem;
          overflow: hidden;
          display: inline-block;
          margin-left: 1.25rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .loginbuttom {
          width: 13.25rem;
          height: 3.0625rem;
          text-align: center;
          font-size: 1rem;
          color: #fff;
          line-height: 3.0625rem;
          margin: 0 auto;
          cursor: pointer;
          background-image: url(../assets/loginbuttom.png);
        }
      }
    }
  }
}
</style>
