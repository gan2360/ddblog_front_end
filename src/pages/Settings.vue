<template>
  <div class="w">
    <MyNav :username="username" :islogin="true"></MyNav>
    <div class="edit">
      <div class="edit-head">
        <div class="left">编辑个人信息</div>
      </div>
      <div class="edit-body">
        <div class="update-form">
          <div class="avatar-zone">
            <img :src="img_src" alt="" />
            <div class="select-upload">
              <el-upload
                class="upload-demo my-upload"
                :on-error="uploadFail"
                :on-success="uploadSuccess"
                action="http://localhost:8000/user/avatar/"
                :data="userinfo"
                :multiple="false"
                :auto-upload="false"
                ref="upload_avatar"
                :headers="{ Authorization: this.token }"
              >
                <i class="el-icon-plus">选取新头像</i>
              </el-upload>
              <el-button
                style="margin-left: 10px"
                size="small"
                @click="submitUpload"
                >上传到服务器</el-button
              >
            </div>
          </div>
          <el-form :model="updateinfo">
            <el-form-item label="昵称：">
              <el-input v-model="updateinfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="个人签名：">
              <el-input v-model="updateinfo.sigh"></el-input>
            </el-form-item>
            <el-form-item label="个人描述：">
              <el-input v-model="updateinfo.info" type="textarea"></el-input>
            </el-form-item>
            <el-button @click="commitUpdate">点击修改</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyNav from "@/components/MyNav.vue";
import { getUser, getAllUser,updateUser } from "@/api/api";
import default_img from "@/assets/images/avatar.jpg";
export default {
  name: "Settings",
  props: ["username"],
  components: { MyNav },
  data() {
    return {
      userinfo: {},
      updateinfo: {},
      img_src: default_img,
      token: localStorage.getItem("token") || null,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
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
    submitUpload() {
      this.$refs.upload_avatar.submit();
    },
    uploadSuccess(response) {
      if (response.code == 403) {
        this.$alert("请先登录", "", { callback: this.goToLogin() });
      } else {
        this.$alert("上传成功", "", {
          callback: (action) => {
            this.$router.go(0);
          },
        });
      }
      // window.location.reload()
    },
    uploadFail(err) {
      this.$alert("上传失败");
      console.log(err);
    },
    commitUpdate() {
      updateUser(this.username, this.updateinfo).then(
        (res) => {
          if (res.data.code == 403) {
            this.$alert("请先登录", "", {
              callback: (action) => {
                this.$router.push("/login");
              },
            });
          } else {
            this.$alert("修改成功", "", {
              callback: (action) => {
                this.$router.go(0);
              },
            });
          }
          console.log(res.data.code);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.getUserInfo(this.username);
  },
};
</script>
<style scoped>
.edit-head {
  display: flex;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid gray;
}
.edit-head .left {
  padding: 0 15px;
  color: white;
  background-color: #000;
}
.edit-body{
    padding-top: 20px;
    padding-left: 0px;
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
