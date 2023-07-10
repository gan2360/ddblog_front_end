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
                <div class="r-head" >
                    <h3>Hi,欢迎注册</h3>
                </div>
                <div class="r-body">
                <el-form ref="register_info" :model="registerInfo" :rules="registerRules" status-icon>
                    <el-form-item prop="username">
                        <el-input placeholder="请输入用户名" v-model="registerInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input placeholder="请输入邮箱" v-model="registerInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入手机号" v-model="registerInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item prop="sms">
                        <el-input placeholder="请输入验证码" v-model="registerInfo.sms" ></el-input><el-button @click="postPhoneNumber" :disabled="countdown>0
                        ">{{button_message}}</el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" v-model="registerInfo.password" type="password"> </el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input placeholder="请再次确认密码" v-model="registerInfo.password2" type="password"></el-input>
                    </el-form-item>
                    <el-button @click="PostRegisterInfo">创建并登录</el-button> <router-link class="login-link" :to="{name:'Login'}">已有账号？点击登录</router-link>
                </el-form>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {UserRegister, getSMS ,validateUsername, } from '../api/api'
import {validateEmail,validatePhone} from '@/utils/validates'
export default {
    name:'MyRegister',
    data() {
        var validatePass = (rule, value, callback) =>{
            if (value === ''){
                callback(new Error('请输入密码'))
            } else{
                if (this.registerInfo.password2 !== ''){
                    this.$refs.register_info.validateField('password2')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {

            console.log(rule);
            if(value === ''){
                callback(new Error('请再次输入密码'))
            } else if(value !==this.registerInfo.password){
                callback(new Error('两次密码输入不一致'))
            } else{ callback()}
        }
        //验证用户名是否已经存在
        var validateName = (rule, value, callback) =>{
            if(value === ''){
                callback(new Error('请输入用户名'))
            }else{
                validateUsername(value).then(res=>{
                    if(res.data.code == 200){callback()}
                    else{
                        callback(new Error('用户已存在'))
                    }
                },err=>{
                    console.log(err);
                })
            }
        }
        return {
            registerRules:{
                username:[{
                    validator:validateName,trigger:'blur'
                }],
                email:[{validator:validateEmail,trigger:'blur'}],
                phone:[{validator:validatePhone,trigger:'blur'}],
                sms:[{required:true,message:'请输入验证码',trigger:'blur'}],
                password:[{validator:validatePass,trigger:'blur'}],
                password2:[{validator:validatePass2,trigger:'blur'}]
            },
            registerInfo:{
                username:'',
                email:'',
                phone:'',
                sms:'',
                password:'',
                password2:''
            },
            countdown:0,
            button_message:'点击获取验证码',
            timer:null

        }
    },
    methods:{
        PostRegisterInfo(){
            this.$refs.register_info.validate((valid)=>{
                if (valid){
                    UserRegister(this.registerInfo).then(res=>
                        {
                            if(res.data.code == 200){
                                let username = res.data.data.username
                                localStorage.setItem('token',res.data.token)
                                localStorage.setItem('username',username)
                                this.$alert('注册成功，点击跳转','',{callback:action=>{
                                    this.$router.push(`personal_info/${username}`)
                                }})
                            } else if(res.data.code == 10003){
                                this.$alert('验证码已过期')
                            } else if(res.data.code == 10004){
                                this.$alert('验证码错误')
                            } else if(res.data.code == 10002){
                                this.$alert('两次输入的密码不同')
                            } 
                        },
                        err=>
                        {
                            this.$alert('发生错误，请联系管理员')
                            console.log(err);
                    })
                } else{
                    console.log('error');
                    return false;
                }
            })
            
        },
        postPhoneNumber(){
            this.countdown = 10
            if(this.registerInfo.phone == ''){
                this.$message('电话号码为空')
                this.countdown = 0
                return
            }
            getSMS({'phone':this.registerInfo.phone}).then(res=>{
                if(res.data.code == 200){
                    this.$alert(`验证码为${res.data.data}`)
                }else{
                    this.$alert('验证码已发送')
                }
            },err=>{
                console.log(err);
            })
            this.timer = setInterval(()=>{
                if(this.countdown<=0){
                    clearInterval(this.timer)
                    this.button_message = '点击获取验证码'
                    return 
                }
                this.countdown -= 1
                this.button_message = `${parseInt(this.countdown)}秒后再次获取`
            },1000)
        }
    },
    mounted(){
        // console.log(this.$refs.register_info);
    }
}
</script>
<style scoped>
.outer{
}
.center{
    overflow: hidden;
    background-color: #fff;
    width: 1000px;
    min-height: 600px;
    display: flex;
    margin: 50px auto 0;
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
.el-input__inner{


}
.r-head{
    margin-bottom: 15px;
}
.login-link{
    margin-left: 15px;
    color: rgb(64,181,255);
}
</style>