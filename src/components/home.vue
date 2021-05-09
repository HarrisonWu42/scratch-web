<template>
  <div class="home">
    <img src="../assets/scai.png" alt="" style="position: fixed; left:25%; top: 10%;"/>
    <el-row :gutter="0">
      <el-col :span="3" :offset="21" class="top" style="margin-top: 10px">
        <el-button :span="3" type="primary" @click="gotologin">登录</el-button>
        <el-button :span="3" type="primary" plain @click="gotoregister">注册</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 300px">
      <el-col :span="8" class="t1">
        <div class="text text1">{{ project_num }}</div>
        <div class="textt tt1">个作品</div>
      </el-col>
      <el-col :span="8" class="t2">
        <div class="text text2">{{ task_num }}</div>
        <div class="textt tt2">道高质量题目</div>
      </el-col>
      <el-col :span="8"  class="t3">
        <div class="text text3">{{ user_num }}</div>
        <div class
                 ="textt tt3">注册用户</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 70px">
      <el-button type="primary" plain class="text">Enter</el-button>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "app",
  components: {},
  data() {
    return {
      project_num: 111,
      task_num: 2222,
      user_num: 33333,
    };
  },
  created() {
    Vue.axios.get("http://localhost:5000/home/").then((response) => {
      response = JSON.parse(response.request.responseText);
      if (response.code === 200) {
        (this.project_num = response.data.project_num),
          (this.task_num = response.data.task_num),
          (this.user_num = response.data.user_num);
      }
    });
  },
  methods: {
    gotologin() {
      this.$router.push("login");
    },
    gotoregister() {
      this.$router.push("register");
    },
  },
};
</script>
<style>
body {
  background: url(../assets/bg.jpeg) no-repeat;
  background-size: 100% 770px;
  overflow: hidden;
}
.text,
.textt {
  font-size: 1.5rem;
  color: #fff;
}
</style>