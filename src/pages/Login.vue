<template>
    <div class="outer">
        <div class="center">
            <div class="left">
                <router-link to="./home"><h2>DDBlog</h2> </router-link>
                <div class="left-bg">
                    <img src="../assets/images/rgt-bg.png" alt="">
                </div>
            </div>
            <div class="right">
                <div class="r-head">
                    <h3>Hi,欢迎登录</h3>
                </div>
                <div class="r-body">
                <el-form ref="login-info" :model="loginInfo">
                    <el-form-item >
                        <el-input placeholder="请输入用户名" v-model="loginInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-input placeholder="请输入密码" v-model="loginInfo.password"></el-input>
                    </el-form-item>

                    <el-button @click="PostloginInfo">登录</el-button> <router-link class="register-lin" :to="{name:'MyRegister'}">没有账号？点击注册</router-link>
                </el-form>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {UserLogin, tokenCheck} from '../api/api.js'
export default {
    name:'Login',
    data() {
        return {
            username:'',
            loginInfo:{
                username:'',
                password:'',

            }
        }
    },
    methods:{
        PostloginInfo(){
            UserLogin(this.loginInfo).then(
                res=>{
                if (res.data.code === 200){
                    this.username = res.data.data.username
                    localStorage.setItem('token',res.data.data.token)
                    localStorage.setItem('username',res.data.data.username)
                    this.$alert('登录成功,点击跳转','',{
                        callback:action=>{this.$router.push(`/personal_info/${this.username}`)}
                    })

                }
                else {
                    this.$message('用户名或密码错误')
                }
            }, 
                err=>{
                    this.$message('网络错误')
                    console.log(err);
                })
        },
        checkToken(){
            let token = localStorage.getItem('token')
            if (!token){
                return false
            }
            tokenCheck().then(res=>{
                // console.log(res);
                if (res.data.code == 200){
                    localStorage.setItem('username',res.data.data.username)
                    let username = localStorage.getItem('username')
                    this.$router.push(`/personal_info/${username}`)
                    return true
                }
            },err=>{
                console.log(err);
                return false
            })
            
        }
    },
    beforeMount(){
        this.checkToken()
    }
}
</script>
<style scoped>
.center{
    background-color: #fff;
    width: 1000px;
    min-height: 600px;
    display: flex;
    margin: 50px auto 0;
    overflow: hidden;
    padding: 40px 0;
    box-shadow: 0 2px 30px #5f6f7c;
}
.center .left{
    display: flex;
    width: 400px;
    justify-content: flex-start;
    flex-direction: column;
    padding: 30px;
    border-right:1px solid #5f6f7c
}
.left .left-bg{
    flex-grow: 1;
    /* background: url('../assets/images/rgt-bg.png') center center no-repeat contain; */
}
.left-bg img{
    margin-top: 50px;
    width: 100%;
}
.center .right{
    padding: 30px;
    flex-grow: 1;
}
.right input{
    width: 100%;
}
.r-head{
    margin: 15px 0
}
.register-lin{
    margin-left: 15px;
    color: rgb(64,181,255);
}
</style>