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
		<el-main>
			<el-button size="mini" type="primary" @click="importstudents">一键导入学生</el-button>
			<span>邀请码：{{this.$root.usedgroup.invite_code}}</span>
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
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				tableData: [],
        usert: false,
			}
		},
		created() {
			Vue.axios.get('http://localhost:5000/home/').then((response) => {
				response = JSON.parse(response.request.responseText);
				if (response.code === 200) {
					console.log('Connect Success')
				}
			})
			this.getgroup();
		},

		methods: {
			getgroup() {
				this.$axios({
					method: 'get',
					url: 'http://localhost:5000/group/' + this.$root.usedgroup.groupid + '/1/5',
				}).then(successResponse => {
					successResponse = JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
					if (successResponse.code === 200) {
						this.tableData = successResponse.data.students
					}
					console.log(this.tableData)
				})
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
							group_id: this.$root.usedgroup.groupid
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
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
  .header{
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
</style>
