<template>
  <div class="w">
    <MyNav :username="username"></MyNav>
    <div class="essay-detail">
      <div class="head">
        <div class="left">文章</div>
      </div>
      <div class="body">
        <div class="title">
          <h1>{{ topic.title }}</h1>
        </div>
        <div class="author-info">
          <span><i class="el-icon-user-solid"></i>{{ author.nickname }}</span
          ><span
            ><i class="el-icon-alarm-clock"></i
            >{{ topic.created_time | timeFilter }}</span
          >
        </div>
        <div class="category">
          <i class="el-icon-s-management"></i>{{ topic.category }}
        </div>
        <div class="introduce">简介：{{ topic.introduce }}</div>
        <div class="content">
          <mavon-editor
            :value="topic.content"
            :subfield="false"
            :editable="false"
            :toolbarsFlag="false"
            defaultOpen="preview"
            :boxShadow="false"
          ></mavon-editor>
        </div>
        <div class="pre" v-if="last_id">
          上一篇：<router-link
            :to="{
              name: 'EssayDetail',
              params: { username: username, t_id: last_id },
            }"
            >{{ last_title }}</router-link
          >
        </div>
        <div class="next" v-if="next_title">
          下一篇：<router-link
            :to="{
              name: 'EssayDetail',
              params: { username: username, t_id: next_id },
            }"
            >{{ next_title }}</router-link
          >
        </div>
      </div>
      <div class="divide"><h3>文章评论</h3></div>
      <div class="comment">
        <div class="comment-head">到现在有{{message_count}}条评论</div>
        <div class="comment-body">
          <div class="comment-item item" v-for="item in message_list" :key="item.id">
            <div class="item-head"><span class="nickname">{{ item.publisher }}</span><span class="time">@{{ item.created_time|timeFilter2 }}</span><span class="reply-btn" @click="openReply(item.id)">回复</span></div>
            <div class="item-content">
              <div class="content">{{ item.content }}</div>
              <img :src="item.publisher_avatr ? back_base_url + item.publisher_avatr : default_img" alt="" class="avatar">
            </div>
            <div class="reply-item item" v-for="r_item in item.reply" :key="r_item.id">
              <div class="item-head"><span class="nickname">{{ r_item.publisher }}</span><span class="time">@{{ r_item.created_time|timeFilter2 }}</span></div>
              <div class="item-content ">
                <div class="content">{{ r_item.content }}</div>
                <img :src="r_item.publisher_avatr ? back_base_url + r_item.publisher_avatr : default_img" alt="" class="avatar">
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="reply-form" v-show="show_reply">
          <div class="form-head">
            <div class="left">输入</div>
            <div class="right"><el-button type="danger" icon="el-icon-error" ></el-button></div>
          </div>
          <div class="form-body"></div>
          <div class="form-footer">
            <el-button>确定</el-button>
          </div>
        </div> -->
      </div>
      <div class="divide"><h3>发表评论</h3></div>
      <div class="pub-comment">
        <el-input type="textarea" v-model="comment_data.content"></el-input>
        <el-button @click="submitMessage">点击发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import MyNav from "@/components/MyNav.vue";
import { getEssayDetail, postMessage } from "@/api/api";
import default_img from "@/assets/images/avatar.jpg";
export default {
  name: "EssayDetail",
  data() {
    return {
      back_base_url:'http://localhost:8000/media/',
      author: {},
      topic: {},
      next_title: "",
      next_id: "",
      last_id: "",
      last_title: "",
      comment_data:{
        content:'',
        parent_id:0
      },
      message_count:0,
      message_list:[],
      show_reply :true,
      default_img:default_img
    };
  },
  filters: {},
  props: ["username", "t_id"],
  components: { MyNav },
  watch: {
    t_id(new_val) {
      this.$router.go(0);
    },
    username(new_val) {
      this.$router.go(0);
    },
  },
  mounted() {
    getEssayDetail(this.username, this.t_id).then(
      (res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.author = res.data.data.author;
          this.topic = res.data.data.topic;
          this.last_id = res.data.data.last_id;
          this.last_title = res.data.data.last_title;
          this.next_id = res.data.data.next_id;
          this.next_title = res.data.data.next_title;
          this.message_count = res.data.data.message_count
          this.message_list = res.data.data.messages
        } else {
          this.$alert("改文章不存在，或你的权限不足", "", {
            callback: (action) => {
              this.$router.go(-1);
            },
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods:{
    submitMessage(){
      postMessage(parseInt(this.t_id),this.comment_data).then(res=>{
        // console.log(res); 
        if(res.data.code==200){
          this.$message('发布成功')
          // this.$router.go(0)
        }
      },err=>{
        console.log(err);
      })
    },
    openReply(parent_id){
      this.$prompt('请输入回复','回复',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(({ value }) => {
          postMessage(parseInt(this.t_id),{content:value,parent_id:parent_id}).then(res=>{
            console.log(res);
            if(res.data.code==200){
              
              this.$message({
              type: 'success',
              message: '发布成功'
            });
            } else{
              this.$message({type:'warning', message:'回复失败'})
            }
          },err=>{
            console.log(err)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    }
  }
};
</script>
<style scoped>
.essay-detail {
  background-color: #fff;
}
.head {
  display: flex;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid gray;
}
.head .left {
  padding: 0 15px;
  color: white;
  background-color: #000;
}
.body {
  padding: 25px;
  background-color: #fff;
  /* width: 1000px; */
}
.body .title {
  height: 45px;
  line-height: 45px;
  font: bolder;
}
.author-info {
  padding: 15px 0;
}
.author-info span {
  margin: 0 25px;
}
.author-info span:first-child {
  margin-left: 0;
}
.introduce {
  margin: 25px 0;
}
.divide {
  padding: 25px;
  height: 25px;
  line-height: 25px;
  border-bottom: 2px solid black;
}
.comment {
  padding: 25px;
}
.comment-head {
  border-top: 1px solid gray;
  padding: 10px 0;
}
.pub-comment{
  padding: 25px;
}
.pub-comment button{
  margin: 15px 0 
}
.item{
  padding: 10px 0;
}
.nickname{
  color: rgb(96, 230, 230);
}
.time{
  color: darkgray;
}
.item-content{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(161, 161, 161);
}
.item img{
  width: 50px;
  height: 50px;
}
.reply-item {
  padding-left: 65px;
}
.reply-btn{
  margin-left: 15px;
  padding: 0 15px;
  cursor: pointer;
}

</style>