<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 头部导航 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录 -->
      <div class="login">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0px 2px 2px #ddd;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.navs {
  flex: 1;
  margin-left: 10px;
  a{
      display: block;
      height: 60px;
      padding: 0 20px;
      box-sizing:border-box;
      &:hover{
          color: #387bca;
          border-bottom:5px #387bca;
      }
  }
  .nuxt-link-exact-active{
          background:#387bca;
          color:#fff;
        &:hover{
          color:#fff;
        }
      }
}
.logo {
    padding-top:10px;
  img{
      width: 156px;
      height: 42px;
      display: block;
  }
}
</style>
