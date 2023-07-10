<template>
    <div >
        <el-menu class="el-menu-demo my-nav" mode="horizontal" background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="/personal_info/unic"
            router
            >
            <div class="username">{{ username }} 的博客</div>
            <!-- <el-menu-item :index="`/home/${username}`">{{ username }}的博客</el-menu-item> -->
            <el-menu-item :index="`/home/${username}`">网站首页</el-menu-item>
            <el-menu-item :index="`/pagelist/${username}`">文章列表</el-menu-item>
            <el-menu-item :index="`/settings/${username}`">编辑个人信息</el-menu-item>
            <el-menu-item :index="`/personal_info/${username}`" >关于我</el-menu-item>
            <el-menu-item index="/release">发布博客</el-menu-item>
            <div class="right-btn">            
                <div class="login" @click="login" v-show="!islogin">登录</div>
                <div class="logout" @click="logout" v-show="islogin">退出登录</div></div>
            </el-menu>

    </div>
</template>
<script>
import PersonalInfo from '@/pages/PersonalInfo.vue';
export default {
    name:'MyNav',
    props:['username' ,'islogin'],
    data() {
        return {
            
        }
    },
    methods:{
        logout(){
            this.$confirm('是否退出登录').then(()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                this.$router.push('/login')
            }).catch(()=>{
                this.$message('已取消')
            })
        },
        login(){
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped>
.my-nav{
    position: relative;
    display: flex;
    flex-direction: row;

}
.right-btn{
    position: absolute;
    right: 15px;
    height: 100%;
    line-height: 60px;
    display: flex;
}
.right-btn div{
    cursor: pointer;
    margin: 0 10px ;
    padding: 0 10px;
}
.right-btn div:first-child{
    color: white;
}
.right-btn div:last-child{
    color: red;
}
.username{
    margin-left: 15px;
    padding:0 15px;
    height: 100%;
    line-height: 60px;
    color: white;
}
</style>