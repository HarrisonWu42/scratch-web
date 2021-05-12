<template>
	<el-container>
		<!-- <input type="file" @change="handleFileUpdate" accept=".xlsx"> --><!-- 这是个上传文件的控件 -->
		<el-header class="header">
      <div class="icon" style="display: inline">
        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>
      </div>
      <div v-if="usert" style="display: inline">
        <span style="margin-right: 20px; font-size: 18px">{{this.$root.USER.name}}</span>
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
      <el-button size="mini" type="primary" @click="back">返回</el-button>
			<el-button size="mini" type="primary" @click="importstudents">一键导入学生</el-button>
			<span>邀请码:{{this.inviteCode}}</span>
			<el-button size="mini" type="primary" @click="outputstudents">导出学生成绩</el-button>
			<el-table :data="tableData">
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
    </el-container>
	</el-container>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				tableData: [],
        inviteCode: '123',
        usert: false,
			}
		},
		created(){
      this.taskt = true;
      this.classt = false;
      this.usert = false;
      this.classes=false;
      if (this.$root.USER.name != null) {
        this.usert = true;
      }
      this.getinviteCode();
			Vue.axios.get('http://localhost:5000/home/').then((response) => {
				response = JSON.parse(response.request.responseText);
				if (response.code === 200) {
					console.log('Connect Success')

				}
			})
			this.getgroup();

		},
    mounted() {
      this.getinviteCode();
    },

    methods: {
			getgroup() {
				this.$axios({
					method: 'get',
					url: 'http://localhost:5000/group/' + this.$route.params.groupid + '/1/5',
				}).then(successResponse => {
					successResponse = JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
					if (successResponse.code === 200) {
						this.tableData = successResponse.data.students
					}
					console.log(this.tableData)
				})
			},
      getinviteCode(){
        this.$axios({
          method: "get",
          url: "http://localhost:5000/group/invite_code/" + this.$route.params.groupid,
        }).then((successResponse) => {
          this.inviteCode = successResponse.data.data.invite_code
          console.log(this.inviteCode)
        });
      },
			handleDelete(index, row) {
				this.$confirm('此操作将踢除该学生, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: 'http://localhost:5000/group/kick',
						data: {
							user_id: row.id,
							group_id: this.$route.params.groupid
						}
					}).then(successResponse => {
						successResponse = JSON.parse(successResponse.request.responseText);
						console.log(successResponse);
						this.getgroup();
					})
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
				console.log(index, row);
			},
      getCommonTaskSet() {
        this.$router.push('taskDB')
      },
      getLimitTaskSet(){
        this.$router.push('taskLimit')
      },
      sclass() {
        this.$router.push('task')
      },
      toGroup(){
        this.$router.push('/group')
      },
      back(){
        this.$router.push('/group')
      },
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
      gotologin() {
        this.$router.push("login");
      },
      gotoregister() {
        this.$router.push("register");
      },
		},
	}
</script>

<style>
.background {
  height: 100%;
  background-color: hsl(203, 33%, 95%);
}

* {
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: var(--text-normal);
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
