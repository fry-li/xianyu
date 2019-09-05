<template>

  <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <!-- 用户名的输入框 -->
        <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="form.username"
            placeholder="用户名/手机">
            </el-input>
        </el-form-item>

        <!-- 密码的输入框 -->
        <el-form-item class="form-item" prop="password">
            <el-input 
            v-model="form.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <!-- 登录按钮 -->
        <el-button 
        class="submit"
        type="primary"
        @click.native="handleLoginSubmit">
            登录
        </el-button>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:'13800138000',
                password:'123456'
            },
            //表单验证
            rules:{
                username:[
                    {required:true,message: '请输入用户名', trigger: 'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        //提交表单数据
        handleLoginSubmit(){
           //验证表单
           this.$refs['form'].validate(valid =>{
               //当valid的值等于ture说明表单验证通过
               if(valid){
                   //请求登录接口
                //    this.$axios({
                //        url:'/accounts/login',
                //        method:"POST",
                //        data:this.form
                //    }).then(res=>{
                //        console.log(res.data)
                //        this.$store.commit('user/setUserInfo',res.data)
                //    })
                this.$store.dispatch('user/login',this.form)
                .then(res=>{
                    this.$message({
                        message:'登陆成功，正在跳转',
                        type:'success'
                    });
                    // 跳转到首页
                    setTimeout(()=>{
                        this.$router.replace('/')
                    },1000)
                })

               }
           })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
    
</style>