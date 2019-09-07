<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名手机" v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="form.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="checkPassword">
        <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
      </el-form-item>

      <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 代表验证通过
        callback();
      }
    };
    return {
      form: {
        username: "", // 用户名
        nickname: "", // 昵称
        captcha: "", // 验证码
        password: "", // 密码
        checkPassword: "" // 确认密码
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        // 文档地址：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
        // validator 不能改，表示指向验证函数
        checkPassword: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    //发送验证码
    handleSendCaptcha() {
      if (!this.form.username) {
        this.$message.error("请输入手机号码");
        return;
      }
      //发送验证码
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
        //   解构出code属性
        const { code } = res.data;
        this.$alert(`模拟手机验证码是：${code}`, "提示");
      });
    },
    // 注册
    handleRegSubmit() {
      console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...rest } = this.form;

          //调用注册接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: rest
          }).then(res => {
            console.log(res);
            this.$store.commit("user/setUserInfo", res.data);
            this.$message.success("成功注册,正在跳转");
            setTimeout(() => {
              this.$router.replace("/");
            }, 2000);
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style> 