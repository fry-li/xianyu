//state 仓库的数据


//用户管理
export const state =()=>({
    userInfo:{
        token:'',
        user:{}
    }
})

export const mutations ={
    //固定参数state,data参数不是必须的
    //保存用户到state中
    setUserInfo(state,data){
       state.userInfo = data;
    },
    //退出--清除userInfo
    clearUserInfo(state,data){
        state.userInfo = {
            token:'',
            user:{}
        }
    }
}


export const actions ={
    login({commit},data){
        console.log(111)
        return this.$axios({
            url:'/accounts/login',
            method: "POST",
            data: data
        }).then(res=>{
            console.log(res)
            const data = res.data
            //保存到setUserInfo
            commit("setUserInfo",data);
            return data
        })
    }
}
