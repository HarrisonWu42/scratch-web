<template>
  <el-container>
    <el-header class="header">
      <div class="icon" style="display: inline">
        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>
      </div>
      <div v-if="usert" style="display: inline">
        <span style="margin-right: 20px; font-size: 18px">{{
            this.$root.USER.name
          }}</span>
        <el-button type="primary" @click="person">个人中心</el-button>
        <el-button type="primary" @click="quit">注销</el-button>
      </div>
      <div v-else style="display: inline">
        <el-button type="primary" @click="gotologin">登录</el-button>
        <el-button type="primary" @click="gotoregister">注册</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="250px">
        <el-page-header @back="goBack" :content="taskSetData.name">
        </el-page-header>

        <el-tag style="margin-top: 50px">个人评分{{score}}/{{total_score}}</el-tag>
      </el-aside>
      <el-main>
        <el-table
            :data="tableData"
            stripe
            @row-dblclick='handleTaskItemClick'
            style="width: 100%">
          <el-table-column
              prop="id"
              label="任务编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="任务名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="commit_num"
              label="提交数"
              width="180">
          </el-table-column>
          <el-table-column
              prop="perfect_num"
              label="满分数"
              width="180">
          </el-table-column>
          <el-table-column
              prop="perfect_rate"
              label="满分率"
              width="180">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Vue from "vue";

export default {
  name: "TaskSet",
  created() {
    this.taskSetData.id = this.$route.params.tasksetid
    this.taskSetData.name = this.$route.params.tasksetname
    this.getTaskSetList()
    Vue.axios.get("http://localhost:5000/home/").then((response) => {
      response = JSON.parse(response.request.responseText);
      if (response.code === 200) {
        (this.project_num = response.data.project_num),
            (this.task_num = response.data.task_num),
            (this.user_num = response.data.user_num);
      }
    });
    this.getUserTask();
    this.taskt = true;
    this.classt = false;
    this.usert = false;
    if (this.$root.USER.name != null) {
      this.usert = true;
      this.getgroup();
      this.getTaskSetList();
    } else {
      this.getTaskSetList();
    }
  },
  data() {
    return {
      taskSetData: {
        id: null,
        name: null,
        type: null
      },
      tableData: [],
      taskt: true,
      classt: false,
      usert: false,
      score:null,
      total_score:null
    }
  },
  methods: {
    person() {
      this.$router.push("person");
    },
    quit() {
      this.$root.USER.name = null;
      this.$root.USER.email = null;
      this.$root.USER.id = null;
      this.$root.USER.confirmed = false;
      console.log(this.$root.USER.name);
      console.log(this.$root.USER.email);
      console.log(this.$root.USER.id);
      console.log(this.$root.USER.confirmed);
      this.$router.push("home");
    },
    goBack() {
      this.$router.back()
    },
    handleBackClick() {
      this.$router.back()
    },
    getTaskSetList() {
      this.$axios({
        method: 'get',
        // url: 'http://localhost:5000/taskset/task/' + this.taskSetData.id + '/1/5',
        url: 'http://localhost:5000/taskset/task/' + this.taskSetData.id,
      }).then(response => {
        this.tableData = response.data.data.tasks
      })
    },
    handleTaskItemClick(e) {
      this.$router.push('/taskset/' + this.taskSetData.id + '/task/' + e.id)
    },
    getgroup() {
      //在需要重新获取班级信息的地方调用
      Vue.axios
          .get(
              "http://localhost:5000/group/teacher/" + this.$root.USER.id + "/1/5"
          )
          .then((response) => {
            response = JSON.parse(response.request.responseText);
            if (response.code === 200) {
              console.log(response);
              this.tableData2 = response.data.groups;
              console.log(this.tableData2[1].name);
            }
          });
    },
    getTaskSet() {
      //在需要重新获取班级信息的地方调用
      Vue.axios
          .get("http://localhost:5000/taskset/" + this.$root.USER.id + "/1/5")
          .then((response) => {
            // response = JSON.parse(response.request.responseText);
            console.log(response);
            if (response.data.code === 200) {
              this.tableData = response.data.data.tasksets;
              console.log(this.tableData);
            }
          });
    },
    gotologin() {
      this.$router.push("login");
    },
    gotoregister() {
      this.$router.push("register");
    },
    getUserTask(){
      var vm = this
      this.$axios({
        method: 'get',
        url: 'http://localhost:5000/taskset/' + this.$root.USER.id+"/"+this.taskSetData.id,
      }).then(response => {
        vm.score = response.data.data.score
        vm.total_score = response.data.data.total_score
      })
    }
  }
}
</script>
<style scoped>
.header {
  color: #333;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
  /* position: fixed;
  top: 0;
  z-index: 9999; */
  background-color: #fff;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
}
.aside{
  padding: 10px 5px;
}
</style>
