<template>
  <div class="w">
    <MyNav :username="username" :islogin="true"></MyNav>
    <div class="essay-content">
      <el-form :model="essayInfo" :rules="essayInfoRules" ref="essay_info">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="essayInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="文章权限" prop="limit">
          <el-radio-group v-model="essayInfo.limit">
            <el-radio label="公开"></el-radio>
            <el-radio label="私有"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章类型" prop="category">
          <el-radio-group v-model="essayInfo.category">
            <el-radio label="技术类"></el-radio>
            <el-radio label="非技术类"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章封面" >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="essayInfo.cover" :src="essayInfo.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章简介" prop="introduce">
          <el-input v-model="essayInfo.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="文章内容:" class="content" prop="content">
          <mavon-editor v-model="essayInfo.content"  :autofocus="false" :boxShadow="false"></mavon-editor>
        </el-form-item>
        <el-form-item >
          <el-button @click="submitEssay">点击上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import MyNav from "@/components/MyNav.vue";
import {postEssay} from '@/api/api'
export default {
  name: "release",
  components: { MyNav },
  data() {
    return {
      headers: {},
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || "",
      essayInfoRules:{
        title:[{required:true,trigger:'blur',message:'请输入文章名'}],
        category:[{required:true,trigger:'blur',message:'请输入文章类别'}],
        limit:[{required:true,trigger:'blur',message:'请输入文章权限'}],
        introduce:[{required:true,trigger:'blur',message:'请输入文章简介'}],
        content:[{required:true,trigger:'blur',message:'请输入文章内容'}],
      },
      essayInfo: {
        title: "",
        category: "",
        limit: "",
        introduce: "",
        cover: "",
        content:""
      },
    };
  },
  methods: {
    uploadSuccess() {},
    uploadFail() {},
    init() {},
    beforeUpload() {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
        
    },
    submitEssay(){
        console.log(this.essayInfo);
        this.$refs.essay_info.validate(valid=>{
          if(valid){
            postEssay(this.username,this.essayInfo).then(res=>{
                console.log(res);
                this.$alert('发布成功','',{callback:action=>{
                  this.$router.push(`pagelist/${this.username}`)
                }})
                if (res.data.code == 10002){
                    this.$alert(res.data.err)
                }
            },err=>{
                console.log(err);
            })
          }else{
            this.$message('请输入必要信息')
          }
        })
    },
  },

  mounted() {},
};
</script>
<style scoped>
.essay-content {
  background-color: #fff;
  padding: 25px;
}
.my-upload {
  margin: 20px 0;
  line-height: 130px;
  width: 150px;
  height: 150px;
  padding: 15px;
  border: 1px dashed gainsboro;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .content{
    margin: 35px 0;
  }
</style>