<template>
  <div class="changePwd">
    <div class="mask">
      <div class="title">修改密码</div>
      <div class="content">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="原密码：" prop="oldPwd">
                <el-input
                  v-model="form.oldPwd"
                  placeholder="请输入原密码"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="新密码：" prop="newPwd">
                <el-input
                  v-model="form.newPwd"
                  placeholder="请输入新密码,密码为12-20位的数字、字母和特殊字符的组合"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="确认密码：" prop="againPwd">
                <el-input
                  v-model="form.againPwd"
                  placeholder="请再次输入新密码"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot">
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      dialogVisible: true,
      form: {},
      rules: {
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" },
        ],
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        againPwd: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: checkPwd2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.form.username = this.getCookie("username");
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http
            .put(`${this.$store.getters.g_url}/user/pwd`, this.form)
            .then((res) => {
              this.$loading.close();
              if (res.data.code == 200) {
                this.$message.success("密码修改成功");
                this.$router.push("/login");
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
.changePwd {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #cccccc;
  .mask {
    width: 40rem; // 640
    height: 26.25rem; // 420
    background: #fff;
    z-index: 99;
    border-radius: 0.375rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -210px 0 0 -320px;
    .title {
      padding-left: 1.5rem;
      box-sizing: border-box;
      line-height: 3.375rem;
      border-bottom: 0.063rem solid #dddddd;
      margin-bottom: 1.625rem;
    }
    .content {
      height: 16.75rem;
      width: 100%;
    }
    .foot {
      border-top: 0.063rem solid #dddddd;
      line-height: 3.25rem;
      text-align: right;
      padding-right: 1.5rem;
      box-sizing: border-box;
    }
  }
}
</style>