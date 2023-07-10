<template>
    <div class="w">
        <my-nav :username="username" :islogin="true"></my-nav>
        <div class="top-bg">
            <img :src="top_bg" alt="">
        </div>
        <div class="list-head">
            <div class="left"> 博客列表</div>
            <div class="right"> 我们长路漫漫，只因学无止境</div>
        </div>
        <div class="list-body">
            <div class="essay-item" v-for="item in essay_list" :key="item.id">
                <h3 @click="goDetail(item.id)">{{ item.title }}</h3>
                <div class="essay-introduce">
                    {{ item.introduce }}
                </div>
                <div class="essay-info">
                    <span class="user"><i class="el-icon-user"></i>{{ nickname }}</span> <span class="uptime"><i class="el-icon-alarm-clock"></i>{{ item.created_time | timeFilter}}</span> <span class="edit" v-if="0"><i class="el-icon-edit"></i>编辑</span><span class="delet" v-if="0"><i class="el-icon-delete" ></i>删除</span>
                </div>
            </div>
        </div>
        <div class="list-footer">
            <el-pagination
                class="my-paginator"
                :page-size="page_size"
                layout="prev, pager, next"
                :total="page_count"
                @current-change="handleChange"
                >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import MyNav from '@/components/MyNav.vue';
import top_bg from "@/assets/images/re_bg.png"
import {getEssayList} from '@/api/api.js'
let that
export default {
    components: { MyNav },
    name:'PageList',
    props:['username'],
    comments:{MyNav},
    data() {
        return {
            page_count:1,
            page_size:3,
            current_page:1,
            category:'',
            essay_list:[],
            top_bg:top_bg,
            nickname:'',
        }
    },
    methods:{
        getList(){
            getEssayList(this.username,{page:this.current_page,category:''}).then(res=>{
                console.log(res);
                if(res.data.code != 200){
                    this.$message('该用户不存在')
                }else{
                    this.essay_list = res.data.data.topics
                    this.nickname = res.data.data.nickname
                    this.page_count = res.data.data.total
                }
            },err=>{
                this.$message('网络错误，请稍后再试')
                console.log(err);
            })
        },
        handleChange(val){
            this.current_page = val
            this.getList()
        },
        goDetail(t_id){
            this.$router.push(`/topic/${this.username}/${t_id}`)
        }
    },
    mounted(){
        this.getList()
        that = this
    },
    filters:{
        timeFilter(value){
            return that.$dayjs(value).format('YYYY-MM-DD')
        }
    }
}
</script>
<style scoped>
.top-bg img{
    width: 100%;
}
.list-head{
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    border-bottom:1px solid gray;
}
.list-head .left{
    color: #fff;
    background-color: #000;
    padding: 0 5px;

}
.essay-item{
    margin: 20px 0;
    padding:35px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.list-body h3{
    cursor: pointer;
    padding: 10px 0;
}
.essay-introduce{
    margin: 20px 0;
    color: rgb(148, 148, 148);
}
.list-body span{
    margin: 0 10px ;
    padding:  0 10px;
    cursor: pointer;
}
.list-body .essay-info span:first-child{
    padding: 0 10px 0 0;
    margin: 0 10px 0 0;
}
i{
    margin: 0 5px 0 0px;
    color:gray;
}
.my-paginator{
    width: 1200px;
}



</style>