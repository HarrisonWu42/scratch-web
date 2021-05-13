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
          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="3" @click.native="toClass">
            <i class="el-icon-menu"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <!--        任务管理-->
        <div v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')">

          <div style="float: left">
            <br>
            <el-button type="primary" @click="creategroup">创建任务</el-button>
            <template>
              <el-select v-model="Nowtaskset.id" placeholder="请选择任务集" style="margin-left: 10px">
                <el-option v-for="item in options" :key="item.id" :label="item.id" :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                  <span class="el-tag el-tag--success el-tag--mini el-tag--plain">{{ item.id }}</span>
              </span>
                </el-option>
              </el-select>
            </template>
          </div>

          <el-table :data="tableDatanew">
            <el-table-column prop="name" label="任务名称" width="120">
            </el-table-column>
            <el-table-column prop="description" label="任务描述">
            </el-table-column>
            <el-table-column prop="teacher" label="导师姓名">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleAdd(scope.$index, scope.row)"
                >分配至任务集
                </el-button>
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                >编辑
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >
                  删除
                </el-button>
                <!--                <el-button-->
                <!--                    size="mini"-->
                <!--                    type="danger"-->
                <!--                    @click="handlelose(scope.$index, scope.row)"-->
                <!--                >关闭-->
                <!--                </el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="创建任务" :visible.sync="dialogFormVisibletask">
      <el-form :model="createGroup">
        <el-form-item :rules="[{ required: true, message: '任务名称不能为空' }]" label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="createGroup.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '任务描述不能为空' }]" label="任务描述" :label-width="formLabelWidth">
          <el-input v-model="createGroup.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '任务url不能为空' }]" label="任务url" :label-width="formLabelWidth">
          <el-input v-model="createGroup.answer_video_url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibletask = false">取 消</el-button>
        <el-button type="primary" @click="createsuccess">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改任务" :visible.sync="dialogFormVisible1">
      <el-form :model="createGroup">
        <el-form-item :rules="[{ required: true, message: '任务名称不能为空' }]" label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="createGroup.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '任务描述不能为空' }]" label="任务描述" :label-width="formLabelWidth">
          <el-input v-model="createGroup.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="老师" :label-width="formLabelWidth">
          <el-input v-model="createGroup.teacher" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="editgroup">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>
  </el-container>
</template>
<script>
import Vue from "vue";

export default {
  inject: ['reload'],
  created() {
    this.getTaskset();
    // this.getCommonTaskSet()
    console.log(this.$root.USER.id)
    Vue.axios
        .get(
            "http://localhost:5000/task/all/1/40"
        )
        .then((response) => {
          response = JSON.parse(response.request.responseText);
          if (response.code === 200) {
            console.log(response);
            this.tableDatanew = response.data.tasksets;
            console.log(this.tableData2[1].name);
          }
        });
    this.taskt = true;
    this.classt = false;
    this.usert = false;
    this.classes=false;
    if (this.$root.USER.name != null) {
      this.usert = true;
    }
  },
  data() {
    return {
      taslsetId: {},
      commontask: [],
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数

      project_num: 111,
      task_num: 2222,
      user_num: 33333,
      createGroup:{
        id:'',
        name:'',
        answer_video_url: '',
        description:'',
        teacher:'',
        teacher_id: ''
      },
      Nowtaskset: {
        name: '',
        id: ''
      },
      taskt: true,
      tasksett: false,
      classt: false,
      usert: false,
      classes:false,
      dialogFormVisibletask: false,
      dialogFormVisiblec: false,
      dialogFormVisible1: false,
      dialogTaskVisible: false,
      groupid: null,
      form: {
        name: "",
        description: "",
      },
      formLabelWidth: "120px",
      //创建任务
      createtask: {
        id: null,
        name: "",
        type: null,
      },
      options: [],
      tableData: [],
      tableData2: [],
      tableDatanew: [],
      search: "",
    };
  },
  methods: {
    createsuccess(){
      console.log(this.$root.USER.id);
      this.$axios({
        method: "post",
        url: "http://localhost:5000/task/add",
        data: {
          name: this.createGroup.name,
          description: this.createGroup.description,
          answer_video_url: this.createGroup.answer_video_url,
          teacher_id: this.$root.USER.id,
        },
      }).then((successResponse) => {
        this.form.name = "";
        this.form.description = "";
        successResponse = JSON.parse(successResponse.request.responseText);
        if(successResponse.code ===200){
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }else{
          this.$notify({
            title: '失败',
            message: '创建失败',
            type: 'warning',
            duration: 2000
          })
        }
        this.getgroup();
        this.dialogFormVisibletask=false
        this.createGroup.name='';
        this.createGroup.id='';
        this.createGroup.description='';
        this.createGroup.teacher='';
        this.createGroup.teacher_id='';
        Vue.axios
            .get(
                "http://localhost:5000/task/all/1/40"
            )
            .then((response) => {
              response = JSON.parse(response.request.responseText);
              if (response.code === 200) {
                console.log(response);
                this.tableDatanew = response.data.tasksets;
                console.log(this.tableData2[1].name);
              }
            });
        this.taskt = true;
        this.classt = false;
        this.usert = false;
        this.classes=false;
        // console.log(successResponse);
        this.reload()
      });
    },
    getTaskset(){
      Vue.axios
          .get("http://localhost:5000/taskset/" + this.$root.USER.id + "/1/30")
          .then((response) => {
            // response = JSON.parse(response.request.responseText);
            console.log(response);
            if (response.data.code === 200) {
              this.options = response.data.data.tasksets;
              console.log(this.options);
            }
          });
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
    // getgroup() {
    //   //在需要重新获取班级信息的地方调用
    //   Vue.axios
    //       .get(
    //           "http://localhost:5000/group/teacher/" + this.$root.USER.id
    //       )
    //       .then((response) => {
    //         response = JSON.parse(response.request.responseText);
    //         if (response.code === 200) {
    //           console.log(response);
    //           this.tableData2 = response.data.groups;
    //           console.log(this.tableData2[1].name);
    //         }
    //       });
    // },
    getgroup() {
      //在需要重新获取班级信息的地方调用
      Vue.axios
          .get(
              "http://localhost:5000/task/all/1/10"
          )
          .then((response) => {
            response = JSON.parse(response.request.tasksets);
            if (response.code === 200) {
              console.log(response);
              this.tableDatanew = response.data.groups;
              console.log(this.tableDatanew[1].name);
            }
          });
    },
    // getTaskSet() {
    //   //在需要重新获取班级信息的地方调用
    //   Vue.axios
    //       .get("http://localhost:5000/taskset/" + this.$root.USER.id + "/1/5")
    //       .then((response) => {
    //         // response = JSON.parse(response.request.responseText);
    //         console.log(response);
    //         if (response.data.code === 200) {
    //           this.tableData = response.data.data.tasksets;
    //           console.log(this.tableData);
    //         }
    //       });
    // },
    handleTaskSetClick(e) {
      this.$router.push("/taskset/" + e.id + '/' + e.name);
    },
    handleClassClick(e) {
      this.$router.push("/editgroup/" + e.id);
    },
    handleAdd(index,row){
      if (this.Nowtaskset.id==''){
        this.$message({
          type: "warning",
          message: "未选择任务集!",
        });
      }else{
        console.log(this.Nowtaskset)
        this.$axios({
          method: "post",
          url: "http://localhost:5000/task/assign2taskset/"+this.Nowtaskset.id+"/"+row.id,
        }).then((successResponse) => {
          successResponse = JSON.parse(successResponse.request.responseText);
          console.log(successResponse);
          Vue.axios
              .get(
                  "http://localhost:5000/task/all/1/30"
              )
              .then((response) => {
                response = JSON.parse(response.request.responseText);
                if (response.code === 200) {
                  console.log(response);
                  this.tableDatanew = response.data.tasksets;
                  console.log(this.tableData2[1].name);
                }
              });
        });
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      }


    },
    handleEdit(index, row) {
      this.createGroup.name = row.name;
      this.createGroup.description = row.description;
      this.createGroup.teacher=row.teacher;
      this.groupid = row.id;
      this.dialogFormVisible1 = true;
      console.log(index, row);
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.$axios({
              method: "post",
              url: "http://localhost:5000/task/delete",
              data: {
                id: row.id,
              },
            }).then((successResponse) => {
              successResponse = JSON.parse(successResponse.request.responseText);
              console.log(successResponse);
              this.getgroup();
              Vue.axios
                  .get(
                      "http://localhost:5000/task/all/1/30"
                  )
                  .then((response) => {
                    response = JSON.parse(response.request.responseText);
                    if (response.code === 200) {
                      console.log(response);
                      this.tableDatanew = response.data.tasksets;
                      console.log(this.tableData2[1].name);
                    }
                  });
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
      // console.log(index, row);
      this.reload()
    },
    handlelose(index, row) {
      this.$confirm("是否确认关闭该班级?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.$axios({
              method: "post",
              url: "http://localhost:5000/group/close",
              data: {
                id: row.id,
              },
            }).then((successResponse) => {
              successResponse = JSON.parse(successResponse.request.responseText);
              console.log(successResponse);
              this.getgroup();
            });
            this.$message({
              type: "success",
              message: "关闭成功!",
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
        url: "http://localhost:5000/group/edit",
        data: {
          id: this.groupid,
          name: this.createGroup.name,
          description: this.createGroup.description,
        },
      }).then((successResponse) => {
        this.createGroup.name = "";
        this.createGroup.description = "";
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
        // console.log(successResponse);
        this.getgroup();
      });
    },
    creategroup() {
      this.dialogFormVisibletask = true;
    },
    quit() {
      this.$root.USER.name = null;
      this.$root.USER.email = null;
      this.$root.USER.id = null;
      this.$root.USER.confirmed = false;
      // console.log(this.$root.USER.name);
      // console.log(this.$root.USER.email);
      // console.log(this.$root.USER.id);
      // console.log(this.$root.USER.confirmed);
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

      this.$router.push('task')
    },
    toClass(){
      this.$router.push('group')
    },
    getPrivateTasket(){

    },
    getCommonTaskSet() {
      this.$router.push('taskDB')
    },
    getLimitTaskSet(){
      this.$router.push('taskLimit')
    },
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
    // 查询固定任务集（题库）
    // getCommonTaskSet() {
    //   this.$axios({
    //     method: "get",
    //     url: "http://localhost:5000/taskset/common/1/5",
    //   }).then((successResponse) => {
    //     this.commontask = successResponse.data.data.tasksets
    //   });
    // }
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







<!--<template>-->
<!--  <el-container class="background">-->
<!--    <el-header class="header">-->
<!--      <div class="icon" style="display: inline">-->
<!--        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>-->
<!--      </div>-->
<!--      <div v-if="usert" style="display: inline">-->
<!--        <span style="margin-right: 20px; font-size: 18px">{{ this.$root.USER.name }}</span>-->
<!--        <el-button type="primary" @click="back">返回</el-button>-->
<!--        <el-button type="primary" @click="person">个人中心</el-button>-->
<!--        <el-button type="primary" @click="quit">注销</el-button>-->
<!--      </div>-->
<!--      <div v-else style="display: inline">-->
<!--        <el-button type="primary" @click="gotologin">登录</el-button>-->
<!--        <el-button type="primary" @click="gotoregister">注册</el-button>-->
<!--      </div>-->
<!--    </el-header>-->

<!--    <el-container>-->
<!--      <el-aside width="200px">-->
<!--        <el-menu style="margin: 10px">-->
<!--          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="1" @click="toTaskDb">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">任务集管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="1-1" @click="getCommonTaskSet">-->
<!--            <span slot="title">固定任务集</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="1-2">-->
<!--            <span slot="title">私有任务集</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="2"  @click="toTask">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">任务管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')" index="3"  @click="toGroup">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">班级管理</span>-->
<!--          </el-menu-item>-->
<!--        </el-menu>-->
<!--      </el-aside>-->

<!--      <el-main>-->
<!--        &lt;!&ndash;        班级管理&ndash;&gt;-->
<!--        <div v-if="($root.USER.role==='Teacher'||$root.USER.role==='Administrator')&&classes">-->
<!--          <el-button type="primary" @click="dialogFormVisible = true" style="margin-left: -1200px">创建班级</el-button>-->
<!--          <el-table :data="tableData2" @row-dblclick="handleClassClick">-->
<!--            <el-table-column prop="name" label="班级名称" width="120">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="description" label="班级描述">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="invite_code" label="邀请码">-->
<!--            </el-table-column>-->
<!--            <el-table-column label="操作">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleEdit(scope.$index, scope.row)"-->
<!--                >编辑-->
<!--                </el-button-->
<!--                >-->
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="handleDelete(scope.$index, scope.row)"-->
<!--                >-->
<!--                  删除-->
<!--                </el-button>-->
<!--                &lt;!&ndash;                <el-button&ndash;&gt;-->
<!--                &lt;!&ndash;                    size="mini"&ndash;&gt;-->
<!--                &lt;!&ndash;                    type="danger"&ndash;&gt;-->
<!--                &lt;!&ndash;                    @click="handlelose(scope.$index, scope.row)"&ndash;&gt;-->
<!--                &lt;!&ndash;                >关闭&ndash;&gt;-->
<!--                &lt;!&ndash;                </el-button>&ndash;&gt;-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--    <el-dialog title="创建班级" :visible.sync="dialogFormVisible">-->
<!--      <el-form :model="createGroup">-->
<!--        <el-form-item :rules="[{ required: true, message: '班级名称不能为空' }]" label="班级名称" :label-width="formLabelWidth">-->
<!--          <el-input v-model="createGroup.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item :rules="[{ required: true, message: '班级描述不能为空' }]" label="班级描述" :label-width="formLabelWidth">-->
<!--          <el-input v-model="createGroup.description" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="creategroup">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--    <el-dialog title="修改班级" :visible.sync="dialogFormVisible1">-->
<!--      <el-form :model="createGroup">-->
<!--        <el-form-item :rules="[{ required: true, message: '班级名称不能为空' }]" label="班级名称" :label-width="formLabelWidth">-->
<!--          <el-input v-model="createGroup.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item :rules="[{ required: true, message: '班级描述不能为空' }]" label="班级描述" :label-width="formLabelWidth">-->
<!--          <el-input v-model="createGroup.description" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="editgroup">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </el-container>-->
<!--</template>-->
<!--<script>-->
<!--import Vue from "vue";-->

<!--export default {-->
<!--  inject: ['reload'],-->
<!--  created() {-->
<!--    this.getCommonTaskSet()-->
<!--    console.log(this.$root.USER.role)-->
<!--    Vue.axios-->
<!--        .get(-->
<!--            "http://localhost:5000/group/teacher/" + this.$root.USER.id-->
<!--        )-->
<!--        .then((response) => {-->
<!--          response = JSON.parse(response.request.responseText);-->
<!--          if (response.code === 200) {-->
<!--            console.log(response);-->
<!--            this.tableData2 = response.data.groups;-->
<!--            console.log(this.tableData2[1].name);-->
<!--          }-->
<!--        });-->
<!--    this.taskt = true;-->
<!--    this.classt = false;-->
<!--    this.usert = false;-->
<!--    this.classes=false;-->
<!--    if (this.$root.USER.name != null) {-->
<!--      this.usert = true;-->
<!--      this.getgroup();-->
<!--      this.getTaskSet();-->
<!--    } else {-->
<!--      this.getTaskSet();-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      commontask: [],-->
<!--      all: 10, //总页数-->
<!--      cur: 1, //当前页码-->
<!--      totalPage: 0, //当前条数-->

<!--      project_num: 111,-->
<!--      task_num: 2222,-->
<!--      user_num: 33333,-->
<!--      createGroup:{-->
<!--        id:'',-->
<!--        name:'',-->
<!--        description:'',-->
<!--        teacher_id:''-->
<!--      },-->
<!--      taskt: true,-->
<!--      tasksett: false,-->
<!--      classt: false,-->
<!--      usert: false,-->
<!--      classes:false,-->
<!--      dialogFormVisible: false,-->
<!--      dialogFormVisiblec: false,-->
<!--      dialogFormVisible1: false,-->
<!--      dialogTaskVisible: false,-->
<!--      groupid: null,-->
<!--      form: {-->
<!--        name: "",-->
<!--        description: "",-->
<!--      },-->
<!--      formLabelWidth: "120px",-->
<!--      //创建任务-->
<!--      createtask: {-->
<!--        name: "",-->
<!--        type: null,-->
<!--      },-->
<!--      options: [{-->
<!--        value: '0',-->
<!--        label: '个人题目集'-->
<!--      }, {-->
<!--        value: '1',-->
<!--        label: '固定题目集'-->
<!--      }],-->
<!--      tableData: [],-->
<!--      tableData2: [],-->
<!--      search: "",-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    back() {-->
<!--      this.$router.push('main')-->
<!--    },-->

<!--    toTaskDb() {-->
<!--      this.$router.push('taskDB')-->
<!--    },-->
<!--    toTask() {-->
<!--      this.$router.push('task')-->
<!--    },-->
<!--    toGroup() {-->
<!--      this.$router.push('group')-->
<!--    },-->


<!--    //请求数据-->
<!--    dataListFn: function (index) {-->
<!--      this.$axios-->
<!--          .get("http://127.0.0.1:8090/demand/selectListByPage", {-->
<!--            params: {-->
<!--              page: index,-->
<!--              limit: "10",-->
<!--              state: 0,-->
<!--            },-->
<!--          })-->
<!--          .then((res) => {-->
<!--            if (res.data.message == "success") {-->
<!--              this.dataList = [];-->
<!--              for (let i = 0; i < res.data.data.length; i++) {-->
<!--                this.dataList.push(res.data.data[i]);-->
<!--              }-->
<!--              this.all = res.data.totalPage; //总页数-->
<!--              this.cur = res.data.pageNum;-->
<!--              this.totalPage = res.data.totalPage;-->
<!--            }-->
<!--          });-->
<!--    },-->
<!--    //分页-->
<!--    btnClick: function (data) {-->
<!--      //页码点击事件-->
<!--      if (data != this.cur) {-->
<!--        this.cur = data;-->
<!--      }-->
<!--      //根据点击页数请求数据-->
<!--      this.dataListFn(this.cur.toString());-->
<!--    },-->
<!--    pageClick: function () {-->
<!--      //根据点击页数请求数据-->
<!--      this.dataListFn(this.cur.toString());-->
<!--    },-->
<!--    getgroup() {-->
<!--      //在需要重新获取班级信息的地方调用-->
<!--      Vue.axios-->
<!--          .get(-->
<!--              "http://localhost:5000/group/teacher/" + this.$root.USER.id-->
<!--          )-->
<!--          .then((response) => {-->
<!--            response = JSON.parse(response.request.responseText);-->
<!--            if (response.code === 200) {-->
<!--              console.log(response);-->
<!--              this.tableData2 = response.data.groups;-->
<!--              console.log(this.tableData2[1].name);-->
<!--            }-->
<!--          });-->
<!--    },-->
<!--    getTaskSet() {-->
<!--      //在需要重新获取班级信息的地方调用-->
<!--      Vue.axios-->
<!--          .get("http://localhost:5000/taskset/" + this.$root.USER.id + "/1/5")-->
<!--          .then((response) => {-->
<!--            // response = JSON.parse(response.request.responseText);-->
<!--            console.log(response);-->
<!--            if (response.data.code === 200) {-->
<!--              this.tableData = response.data.data.tasksets;-->
<!--              console.log(this.tableData);-->
<!--            }-->
<!--          });-->
<!--    },-->
<!--    handleTaskSetClick(e) {-->
<!--      this.$router.push("/taskset/" + e.id + '/' + e.name);-->
<!--    },-->
<!--    handleClassClick(e) {-->
<!--      this.$router.push("/editgroup/" + e.id);-->
<!--    },-->
<!--    handleEdit(index, row) {-->
<!--      this.createGroup.name = row.name;-->
<!--      this.createGroup.description = row.description;-->
<!--      this.groupid = row.id;-->
<!--      this.dialogFormVisible1 = true;-->
<!--      console.log(index, row);-->
<!--    },-->

<!--    handleDelete(index, row) {-->
<!--      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning",-->
<!--      })-->
<!--          .then(() => {-->
<!--            this.$axios({-->
<!--              method: "post",-->
<!--              url: "http://localhost:5000/group/delete",-->
<!--              data: {-->
<!--                id: row.id,-->
<!--              },-->
<!--            }).then((successResponse) => {-->
<!--              successResponse = JSON.parse(successResponse.request.responseText);-->
<!--              console.log(successResponse);-->
<!--              this.getgroup();-->
<!--            });-->
<!--            this.$message({-->
<!--              type: "success",-->
<!--              message: "删除成功!",-->
<!--            });-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message({-->
<!--              type: "info",-->
<!--              message: "已取消",-->
<!--            });-->
<!--          });-->
<!--      // console.log(index, row);-->
<!--      this.reload()-->
<!--    },-->
<!--    handlelose(index, row) {-->
<!--      this.$confirm("是否确认关闭该班级?", "提示", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning",-->
<!--      })-->
<!--          .then(() => {-->
<!--            this.$axios({-->
<!--              method: "post",-->
<!--              url: "http://localhost:5000/group/close",-->
<!--              data: {-->
<!--                id: row.id,-->
<!--              },-->
<!--            }).then((successResponse) => {-->
<!--              successResponse = JSON.parse(successResponse.request.responseText);-->
<!--              console.log(successResponse);-->
<!--              this.getgroup();-->
<!--            });-->
<!--            this.$message({-->
<!--              type: "success",-->
<!--              message: "关闭成功!",-->
<!--            });-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message({-->
<!--              type: "info",-->
<!--              message: "已取消",-->
<!--            });-->
<!--          });-->
<!--      console.log(index, row);-->
<!--    },-->
<!--    person() {-->
<!--      this.$router.push("person");-->
<!--    },-->
<!--    editgroup() {-->
<!--      this.dialogFormVisible1 = false;-->
<!--      this.$axios({-->
<!--        method: "post",-->
<!--        url: "http://localhost:5000/group/edit",-->
<!--        data: {-->
<!--          id: this.groupid,-->
<!--          name: this.createGroup.name,-->
<!--          description: this.createGroup.description,-->
<!--        },-->
<!--      }).then((successResponse) => {-->
<!--        this.createGroup.name = "";-->
<!--        this.createGroup.description = "";-->
<!--        successResponse = JSON.parse(successResponse.request.responseText);-->
<!--        if(successResponse.code ===200){-->
<!--          this.$notify({-->
<!--            title: '成功',-->
<!--            message: '修改成功',-->
<!--            type: 'success',-->
<!--            duration: 2000-->
<!--          })-->
<!--        }else{-->
<!--          this.$notify({-->
<!--            title: '失败',-->
<!--            message: '修改失败',-->
<!--            type: 'warning',-->
<!--            duration: 2000-->
<!--          })-->
<!--        }-->
<!--        // console.log(successResponse);-->
<!--        this.getgroup();-->
<!--      });-->
<!--    },-->
<!--    creategroup() {-->
<!--      this.dialogFormVisible = false;-->
<!--      console.log(this.$root.USER.id);-->
<!--      this.$axios({-->
<!--        method: "post",-->
<!--        url: "http://localhost:5000/group/add",-->
<!--        data: {-->
<!--          name: this.createGroup.name,-->
<!--          description: this.createGroup.description,-->
<!--          teacher_id: this.$root.USER.id,-->
<!--        },-->
<!--      }).then((successResponse) => {-->
<!--        this.form.name = "";-->
<!--        this.form.description = "";-->
<!--        successResponse = JSON.parse(successResponse.request.responseText);-->
<!--        if(successResponse.code ===200){-->
<!--          this.$notify({-->
<!--            title: '成功',-->
<!--            message: '创建成功',-->
<!--            type: 'success',-->
<!--            duration: 2000-->
<!--          })-->
<!--        }else{-->
<!--          this.$notify({-->
<!--            title: '失败',-->
<!--            message: '创建失败',-->
<!--            type: 'warning',-->
<!--            duration: 2000-->
<!--          })-->
<!--        }-->
<!--        this.getgroup();-->
<!--        // console.log(successResponse);-->
<!--        this.reload()-->
<!--      });-->
<!--    },-->
<!--    quit() {-->
<!--      this.$root.USER.name = null;-->
<!--      this.$root.USER.email = null;-->
<!--      this.$root.USER.id = null;-->
<!--      this.$root.USER.confirmed = false;-->
<!--      // console.log(this.$root.USER.name);-->
<!--      // console.log(this.$root.USER.email);-->
<!--      // console.log(this.$root.USER.id);-->
<!--      // console.log(this.$root.USER.confirmed);-->
<!--      this.$router.push("home");-->
<!--    },-->
<!--    task() {-->
<!--      this.getTaskSet();-->
<!--      this.classt = false;-->
<!--      this.taskt = true;-->
<!--      this.tasksett = false-->
<!--      this.classes=false-->
<!--      this.$forceUpdate();-->
<!--      console.log(this.taskt);-->
<!--    },-->
<!--    sclass() {-->
<!--      this.$router.push('task')-->
<!--    },-->
<!--    toClass(){-->
<!--      this.$router.push('group')-->
<!--    },-->
<!--    staskset() {-->
<!--      this.$router.push('taskDB')-->
<!--    },-->
<!--    handleOpen(key, keyPath) {-->
<!--      console.log(key, keyPath);-->
<!--    },-->
<!--    handleClose(key, keyPath) {-->
<!--      console.log(key, keyPath);-->
<!--    },-->
<!--    gotologin() {-->
<!--      this.$router.push("login");-->
<!--    },-->
<!--    gotoregister() {-->
<!--      this.$router.push("register");-->
<!--    },-->
<!--    // 查询固定任务集（题库）-->
<!--    getCommonTaskSet() {-->
<!--      this.$axios({-->
<!--        method: "get",-->
<!--        url: "http://localhost:5000/taskset/common/1/5",-->
<!--      }).then((successResponse) => {-->
<!--        this.commontask = successResponse.data.data.tasksets-->
<!--      });-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<style>-->
<!--.background {-->
<!--  height: 100%;-->
<!--  background-color: hsl(203, 33%, 95%);-->
<!--}-->

<!--* {-->
<!--  &#45;&#45;tw-ring-inset: var(&#45;&#45;tw-empty, /*!*/ /*!*/);-->
<!--  &#45;&#45;tw-ring-offset-width: 0px;-->
<!--  &#45;&#45;tw-ring-offset-color: var(&#45;&#45;text-normal);-->
<!--  &#45;&#45;tw-ring-color: rgba(147, 197, 253, 0.5);-->
<!--  &#45;&#45;tw-ring-offset-shadow: 0 0 #0000;-->
<!--  &#45;&#45;tw-ring-shadow: 0 0 #0000;-->
<!--  &#45;&#45;tw-shadow: 0 0 #0000;-->
<!--  box-sizing: border-box;-->
<!--}-->

<!--.pc-v {-->
<!--  display: flex;-->
<!--  min-width: 0;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.br-1 {-->
<!--  margin: 20px 10px 0 10px;-->
<!--  border-radius: 0.25rem;-->
<!--  background-color: #fff;-->
<!--}-->

<!--.tw-pr-4 {-->
<!--  padding-right: 1rem;-->
<!--}-->

<!--.tw-py-1 {-->
<!--  padding-top: 0.25rem;-->
<!--  padding-bottom: 0.25rem;-->
<!--}-->

<!--.tw-justify-center {-->
<!--  justify-content: center;-->
<!--}-->

<!--.tw-items-center {-->
<!--  align-items: center;-->
<!--}-->

<!--.tw-flex {-->
<!--  display: flex;-->
<!--}-->

<!--.tw-pb-2 {-->
<!--  padding-bottom: 0.5rem;-->
<!--}-->

<!--.tw-flex-wrap {-->
<!--  flex-wrap: wrap;-->
<!--}-->

<!--.tw-mt-2 {-->
<!--  margin-top: 0.5rem;-->
<!--}-->

<!--ul,-->
<!--li {-->
<!--  margin: 0px;-->
<!--  padding: 0px;-->
<!--}-->

<!--li {-->
<!--  list-style: none;-->
<!--}-->

<!--.page-bar li:first-child > a {-->
<!--  margin-left: 0px;-->
<!--}-->

<!--.page-bar a {-->
<!--  border: 1px solid #ddd;-->
<!--  text-decoration: none;-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  padding: 6px 12px;-->
<!--  margin-left: -1px;-->
<!--  line-height: 1.42857143;-->
<!--  color: #5d6062;-->
<!--  cursor: pointer;-->
<!--  margin-right: 20px;-->
<!--}-->

<!--.page-bar a:hover {-->
<!--  background-color: #eee;-->
<!--}-->

<!--.page-bar a.banclick {-->
<!--  cursor: not-allowed;-->
<!--}-->

<!--.page-bar .active a {-->
<!--  color: #fff;-->
<!--  cursor: default;-->
<!--  background-color: #e96463;-->
<!--  border-color: #e96463;-->
<!--}-->

<!--.page-bar i {-->
<!--  font-style: normal;-->
<!--  color: #d44950;-->
<!--  margin: 0px 4px;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.header {-->
<!--  color: #333;-->
<!--  width: 100%;-->
<!--  height: 60px;-->
<!--  line-height: 60px;-->
<!--  text-align: right;-->
<!--  font-size: 12px;-->
<!--  /* position: fixed;-->
<!--  top: 0;-->
<!--  z-index: 9999; */-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);-->
<!--}-->

<!--.icon {-->
<!--  float: left;-->
<!--}-->

<!--.icon img {-->
<!--  height: 60px;-->
<!--}-->
<!--</style>-->
