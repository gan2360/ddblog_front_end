<template>
  <div class="about w">
    <my-nav :username="username" :islogin="true"> 22</my-nav>
    <div class="about-head">
      <div class="detail-h">关于我</div>
      <div class="simple-h">个人简介</div>
    </div>
    <div class="about-body">
      <section class="left">
        {{ userinfo.info || "空空如也" }}
      </section>
      <section class="right">
        <div class="basic-info">
          
            <img :src="img_src" alt="" />
          
          <div class="username">{{ userinfo.nickname }}</div>
        </div>
        <div class="sigh">"{{ userinfo.sigh }}"</div>
      </section>
    </div>

  </div>
</template>
<script>
import { getUser, getAllUser,updateUser } from "@/api/api";
import MyNav from "@/components/MyNav.vue";
import default_img from "@/assets/images/avatar.jpg";
export default {
  name: "PersonalInfo",
  props: ["username"],
  components: { MyNav },
  data() {
    return {
      userinfo: {},
      updateinfo: {},
      img_src: default_img,
      token:localStorage.getItem('token')||null
    };
  },

  mounted() {
    this.getUserInfo(this.username);

  },
  activated() {},
  methods: {
    goToLogin(){
      this.$router.push('/login')
    },
    async getUserInfo(username) {
      getUser(username).then(
        (res) => {
          this.userinfo = res.data;
          this.updateinfo = JSON.parse(JSON.stringify(this.userinfo));
          this.img_src = this.userinfo.avatar
            ? this.userinfo.avatar
            : default_img;
        },
        (err) => {
          this.$message("用户不存在");
          console.log(err);
        }
      );
    },
    async getUsers() {
      getAllUser().then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    submitUpload(){
        this.$refs.upload_avatar.submit();
    },
    uploadSuccess(response){
        if(response.code == 403){
          this.$alert('请先登录','',{callback:this.goToLogin()})
        }else{
          this.$alert('上传成功','',{callback:action=>{this.$router.go(0)}})
        }
        // window.location.reload()
    },
    uploadFail(err){
        this.$alert('上传失败')
        console.log(err);
    },
    commitUpdate(){
      updateUser(this.username, this.updateinfo).then(res=>{
        if(res.data.code == 403){
          this.$alert('请先登录','',{callback:action=>{this.$router.push('/login')}})
        }else{
          this.$alert('修改成功','', {callback:action=>{
            this.$router.go(0)
          }})
        }
       console.log(res.data.code) 
      },
      err=>{
        console.log(err)
      })
    }
  },
};
</script>
<style scoped>
.about-head {
  display: flex;
  justify-content: space-between;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid black;
}
.about-head .detail-h {
  padding: 0 30px;
  background-color: #000;
  color: aliceblue;
}
.about-body .left {
  width: 650px;
  background-color: #fff;
  box-shadow: 0 2px 20px #5f6f7c;
}
.about-body {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.about-body .left {
  padding: 50px;
  width: 720px;
  background-color: #fff;
  box-shadow: 0 2px 10px #c4c7c9;
}
.about-body .right {
  padding: 50px;
  width: 450px;
  background-color: #fff;
  box-shadow: 0 2px 10px #c4c7c9;
  display: flex;
  flex-direction: column;
}
.about-body .basic-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.about-body .sigh {
  margin-top: 25px;
  color: gray;
}
.avatar {
  overflow: hidden;
  /* width: 100px; */
  /* border-radius: 25px; */
}
.right img {
  width: 100px;
  padding: 10px 0;
}
.update-form{
    padding: 60px;
    width: 600px;
    background-color: #fff;
}
.avatar-zone{
    padding: 15px;
    border-bottom: 1px solid gainsboro;
    display: flex;
    flex-direction: column;
    align-items: center;

}
.avatar-zone img{
    width: 100px;
}
.my-upload{
    margin: 20px 0;
    padding: 15px;
    border: 1px dashed gainsboro;

}
</style>