<template>
  <el-container class="background">
    <el-header class="header">
      <div class="icon" style="display: inline">
        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>
      </div>
      <div v-if="usert" style="display: inline">
        <span style="margin-right: 20px; font-size: 18px">{{ this.$root.USER.name }}</span>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="primary" @click="person">个人中心</el-button>
        <el-button type="primary" @click="quit">注销</el-button>
      </div>
      <div v-else style="display: inline">
        <el-button type="primary" @click="gotologin">登录</el-button>
        <el-button type="primary" @click="gotoregister">注册</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu style="margin: 10px">
          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="1" @click="getCommonTaskSet">
            <i class="el-icon-menu"></i>
            <span slot="title">任务集管理</span>
          </el-menu-item>
          <el-menu-item index="1-1" @click="getCommonTaskSet">
            <span slot="title">固定任务集</span>
          </el-menu-item>
          <el-menu-item index="1-2" @click="getLimitTaskSet">
            <span slot="title">私有任务集</span>
          </el-menu-item>
          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="2" @click.native="sclass">
            <i class="el-icon-menu"></i>
            <span slot="title">任务管理</span>
          </el-menu-item>
          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="3" @click.native="toGroup">
            <i class="el-icon-menu"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')">
          <el-button type="primary" @click="dialogTaskVisible = true">创建任务集</el-button>
          <el-table :data="commontask" @row-dblclick="handleClassClick">
            <el-table-column prop="id" label="id" width="120"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
<!--                <el-button size="mini" type="danger" @click="handlelose(scope.$index, scope.row)">关闭-->
<!--                </el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="创建任务集" :visible.sync="dialogTaskVisible">
      <el-form :model="createtask">
        <el-form-item :rules="[{ required: true, message: '任务集名称不能为空' }]" label="任务集名称" :label-width="formLabelWidth">
          <el-input v-model="createtask.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '任务集不能为空' }]" label="任务集描述" :label-width="formLabelWidth">
          <el-select v-model="createtask.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTaskVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTask">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改任务集" :visible.sync="dialogFormVisible1">
            <el-form :model="form">
              <el-form-item :rules="[{ required: true, message: '班级名称不能为空' }]" label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editgroup">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>
<script>
import Vue from "vue";
export default {
  created() {
    this.getCommonTaskSet()
    console.log(this.$root.USER.role)
    Vue.axios.get("http://localhost:5000/home/").then((response) => {
      response = JSON.parse(response.request.responseText);
      if (response.code === 200) {
        (this.project_num = response.data.project_num),
            (this.task_num = response.data.task_num),
            (this.user_num = response.data.user_num);
      }
    });
    this.taskt = true;
    this.classt = false;
    this.usert = false;
    this.classes=false;
    if (this.$root.USER.name != null) {
      this.usert = true;
      this.getgroup();
      this.getTaskSet();
    } else {
      this.getTaskSet();
    }
  },
  data() {
    return {
      commontask: [],
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数

      project_num: 111,
      task_num: 2222,
      user_num: 33333,
      teacher_id: {},
      taskt: true,
      tasksett: false,
      classt: false,
      usert: false,
      classes:false,
      dialogFormVisible: false,
      dialogFormVisiblec: false,
      dialogTaskVisible: false,

      dialogFormVisible1:false,

      groupid: null,
      form: {
        name: "",
        type: "1",
      },
      formLabelWidth: "120px",
      //创建任务
      createtask: {
        name: "",
        type: null,
      },
      options: [{
        value: '0',
        label: '私有任务集'
      }, {
        value: '1',
        label: '固定任务集'
      }],
      tableData: [],
      tableData2: [],
      search: "",
    };
  },
  methods: {
    handleClassClick(row){
      this.$router.push({path:'tasksetNew/'+row.id+'/taskall',query:{tasksetName : row.name,tasksetid:row.id}})
    },
    back() {
      this.$router.push('main')
    },
    toTaskDb() {
      this.$router.push('taskDB')
    },
    //请求数据
    dataListFn: function (index) {
      this.$axios
          .get("http://127.0.0.1:8090/demand/selectListByPage", {
            params: {
              page: index,
              limit: "10",
              state: 0,
            },
          })
          .then((res) => {
            if (res.data.message == "success") {
              this.dataList = [];
              for (let i = 0; i < res.data.data.length; i++) {
                this.dataList.push(res.data.data[i]);
              }
              this.all = res.data.totalPage; //总页数
              this.cur = res.data.pageNum;
              this.totalPage = res.data.totalPage;
            }
          });
    },
    //分页
    btnClick: function (data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
    },
    pageClick: function () {
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
    },
    getgroup() {
      //在需要重新获取班级信息的地方调用
      Vue.axios
          .get(
              "http://localhost:5000/taskset/common/1/5"
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
    handleTaskSetClick(e) {
      this.$router.push("/taskset/" + e.id + '/' + e.name);
    },
    // handleClassClick(e) {
    //   this.$router.push("/editgroup/" + e.id);
    // },
    handleEdit(index, row) {
      this.form.name = row.name;
      this.form.id = row.id;
      this.form.type= 1;
      this.form.teacher_id = row.teacher_id;
      this.dialogFormVisible1 = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.$axios({
              method: "post",
              url: "http://localhost:5000/taskset/delete",
              data: {
                id: row.id,
              },
            }).then((successResponse) => {
              successResponse = JSON.parse(successResponse.request.responseText);
              console.log(successResponse);
              this.getCommonTaskSet();
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      console.log(index, row);
    },
    person() {
      this.$router.push("person");
    },
    editgroup() {
      this.dialogFormVisible1 = false;
      this.$axios({
        method: "post",
        url: "http://localhost:5000/taskset/edit",
        data: {
          id: this.form.id,
          name: this.form.name,
          type: this.form.type
        },
      }).then((successResponse) => {
        successResponse = JSON.parse(successResponse.request.responseText);
        if(successResponse.code ===200){
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }else{
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'warning',
            duration: 2000
          })
        }
        console.log(successResponse);
        this.getCommonTaskSet()
      });
    },
    createTask() { //创建时无法填写teacher_id
      this.dialogTaskVisible = false;
      this.$axios({
        method: "post",
        url: "http://localhost:5000/taskset/add",
        data: {
          // id:this.$root.USER.id,
          name: this.createtask.name,
          type: this.createtask.type,
          teacher_id: this.$root.USER.id
          // teacher_id: this.$root.USER.id,
        },
      }).then((successResponse) => {
        this.createtask.name = "";
        this.createtask.type = "";

        successResponse = JSON.parse(successResponse.request.responseText);
        this.getCommonTaskSet();
        console.log(successResponse);
      });
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
    task() {
      this.getTaskSet();
      this.classt = false;
      this.taskt = true;
      this.tasksett = false
      this.classes=false
      this.$forceUpdate();
      console.log(this.taskt);
    },
    sclass() {
      this.$router.push('/task')
    },
    toGroup(){
      this.$router.push('/group')
    },
    // staskset() {
    //   this.$router.push('/taskDB')
    // },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gotologin() {
      this.$router.push("login");
    },
    gotoregister() {
      this.$router.push("register");
    },
    getLimitTaskSet(){
      this.$router.push('taskLimit')
    },
    // 查询固定任务集（题库）
    getCommonTaskSet() {
      this.$axios({
        method: "get",
        url: "http://localhost:5000/taskset/common/1/20",
      }).then((successResponse) => {
        this.commontask = successResponse.data.data.tasksets
      });
    }
  },
};
</script>
<style>
.background {
  height: 100%;
  background-color: hsl(203, 33%, 95%);
}

* {
  /*--tw-ring-inset: var(--tw-empty, !*!*! !*!*!);*/
  --tw-ring-offset-width: 0px;
  /*--tw-ring-offset-color: var(--text-normal);*/
  --tw-ring-color: rgba(147, 197, 253, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  box-sizing: border-box;
}

.pc-v {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.br-1 {
  margin: 20px 10px 0 10px;
  border-radius: 0.25rem;
  background-color: #fff;
}

.tw-pr-4 {
  padding-right: 1rem;
}

.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.tw-justify-center {
  justify-content: center;
}

.tw-items-center {
  align-items: center;
}

.tw-flex {
  display: flex;
}

.tw-pb-2 {
  padding-bottom: 0.5rem;
}

.tw-flex-wrap {
  flex-wrap: wrap;
}

.tw-mt-2 {
  margin-top: 0.5rem;
}

ul,
li {
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
}

.page-bar li:first-child > a {
  margin-left: 0px;
}

.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5d6062;
  cursor: pointer;
  margin-right: 20px;
}

.page-bar a:hover {
  background-color: #eee;
}

.page-bar a.banclick {
  cursor: not-allowed;
}

.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #e96463;
  border-color: #e96463;
}

.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}

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

.icon {
  float: left;
}

.icon img {
  height: 60px;
}
</style>
