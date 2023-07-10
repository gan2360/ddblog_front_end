<template>
    <div class="w">
        <MyNav :username="username" :islogin="true"></MyNav>
        <div class="head">
            <div class="left">
                网站首页
            </div>
            <div class="right"></div>
        </div>
        <div class="body">
            <div class="card">
                <div class="h"><h2>技术类博客推荐</h2> </div>
                <div class="b">
                    <div class="topic-item" v-for="item in techs" :key="item.id">
                        <div class="item-h" @click="goDetail(item.id)"><h3>标题：{{ item.title }}</h3></div>
                        <div class="item-b">文章简介：{{ item.introduce }}</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="h"><h2>非技术类博客推荐</h2></div>
                <div class="b">
                    <div class="topic-item" v-for="item in no_techs" :key="item.id">
                        <div class="item-h" @click="goDetail(item.id)"><h3>标题：{{ item.title }}</h3></div>
                        <div class="item-b">文章简介：{{ item.introduce }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MyNav from '@/components/MyNav.vue'
import {getRandomTpoics} from '@/api/api.js'

export default {
    name:'Home',
    data() {
        return {
            techs:[],
            no_techs:[]
        }
    },
    components:{MyNav},
    props:['username'],
    methods:{
        prepareTopics(){
            getRandomTpoics().then(res=>{
                if (res.data.code == 200){
                    this.techs = res.data.data.tech
                    this.no_techs = res.data.data.no_tech
                }
            },err=>{
                console.log(err);
            })
        },
        goDetail(t_id){
            this.$router.push(`/topic/${this.username}/${t_id}`)
        }
    },
    mounted(){
        this.prepareTopics()
    }
}
</script>
<style scoped>
.head{
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    border-bottom:1px solid gray;
}
.head .left{
    color: #fff;
    background-color: #000;
    padding: 0 5px;
}
.body{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.body .card{
    margin-top: 15px;
    box-shadow: 0 2px 10px #c4c7c9;
    width: 550px;
    padding: 15px ;
    background-color: #fff;
}
.card .h{
    border-bottom: 1px solid gainsboro;
    padding: 10px 0;
}
.topic-item{
    padding: 10px 0;
    border-bottom: 1px solid rgb(184, 181, 181);
}
.item-h{
    cursor: pointer;
    height: 45px;
    line-height: 45px;

}
</style>