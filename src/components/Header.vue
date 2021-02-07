<template>
  <div class="pageheader_box clearfix">
    <div class="left">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="right">
      <div class="left-box">
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="imgs-box">
              <i class="iconfont icontishi"></i>
            </div>
            <p style="color: #fff">
              {{ username }}
            </p>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleEdit"
              >更改密码</el-dropdown-item
            >
            <!-- <el-dropdown-item @click.native="pinformation"
                  >个人信息</el-dropdown-item
                > -->
            <!-- <el-dropdown-item @click.native="handleCa"
                  >绑定CA</el-dropdown-item
                > -->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.username = this.getCookie("username");
    console.log(this.getCookie("username"));
  },
  methods: {
    //退出
    logout() {
      var keys = document.cookie.match(/[^ =;]+(?=)/g);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
      this.$store.dispatch("a_loginstatus", false);
      this.$store.dispatch("a_settabs", [
        {
          path: "/",
          name: "主页",
        },
      ]);
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.pageheader_box {
	height: 100%;
	background-color: $color;
	box-sizing: border-box;
  .left {
    float: left;
    width: 26.25rem;
    height: 50px;
    margin: 1rem 2.875rem;

    img {
      width: 100%;
      // height: 100%;
    }
  }
  .right {
    float: right;
    padding-right: 4rem;
    height: 5rem;

    .left-box {
      float: left;

      .imgs-box {
        float: left;
        width: 2rem;
        height: 2rem;
        margin-top: 1.7rem;
        text-align: center;
        line-height: 2rem;
        border-radius: 50%;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.6);
        i {
          color: #fff;
          float: none;
          margin-top: 0;
          font-size: 1.25rem;
          margin-left: -0.1875rem;
        }
      }

      .el-dropdown-link {
        font-family: MicrosoftYaHei;
        font-size: 0.875rem;
        line-height: 5rem;
        letter-spacing: 0.0625rem;
        color: #333;
        text-indent: 0.25rem;
        cursor: pointer;
      }

      .el-dropdown {
        height: 3rem;
        display: inline-block;
        position: relative;
        color: #606266;
        font-size: 0.875rem;
        margin-bottom: 5rem;
      }

      p {
        float: left;
        font-family: MicrosoftYaHei;
        font-size: 0.875rem;
        line-height: 5rem;
        letter-spacing: 0.0625rem;
        color: #333;
        text-indent: 0.25rem;
        margin-top: 0.1rem;
      }

      i {
        float: right;
        color: #ccc;
        margin-top: 2.1rem;
      }

      span {
        float: right;
        margin: 0 0.3rem;
        color: #d1d1d5;
      }
    }
  }
}
</style>