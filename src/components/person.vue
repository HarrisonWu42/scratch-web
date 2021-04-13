<template>
	<div class="person">
		<el-container>
			<el-header style="font-size: 30px;">个人中心</el-header>
			<el-main>














				<el-row :gutter="20">
					<el-col :span="6" :offset="4">
						<div class="grid-content bg-purple">昵称：</div>
					</el-col>
					<el-col :span="3" :offset="1">
						<div class="grid-content bg-purple">{{username}}</div>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" plain @click="editname">修改昵称</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6" :offset="4">
						<div class="grid-content bg-purple">邮箱地址：</div>
					</el-col>
					<el-col :span="5" :offset="1">
						<div class="grid-content bg-purple">{{useremail}}</div>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" plain @click="editemail">修改邮箱</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6" :offset="4">
						<div class="grid-content bg-purple">密码管理：</div>
					</el-col>
					<el-col :span="2" :offset="1">
						<el-button type="danger" plain @click="editpassword">重置密码</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6" :offset="4">
						<div class="grid-content bg-purple">邀请码：</div>
					</el-col>
					<el-col :span="5" :offset="1">
						<el-input v-model="input" placeholder="请输入邀请码"></el-input>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" plain @click="beinvite">接受邀请</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<!-- <a href="http://localhost:5000/group/output_excel/<group_id>">66666</a> -->
					<el-col :span="20">
						<el-button type="primary" @click="gotomain">返回主页</el-button>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		// created() {
		// 	if (this.$root.USER.name == null) {
		// 		alert("未登录，请先登录");
		// 		this.$router.push('login')
		// 	}
		// },
		created(){
			this.username = this.$root.USER.name;
			this.useremail = this.$root.USER.email
		},
		data() {
			return {
				username:null,
				useremail:null,
				input: ''
			}
		},
		methods: {









			editname() {
				this.$prompt('请输入新昵称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					this.$axios({
						method: 'post',
						url: 'http://localhost:5000/user/edit-name/'+this.$root.USER.id,
						data: {
							name: value
						}
					}).then(successResponse => {
						successResponse = JSON.parse(successResponse.request.responseText);
						if (successResponse.code === 200) {
							console.log(successResponse)
							this.$root.USER.name = successResponse.data.name;
							this.username = this.$root.USER.name;
						}
					})
					this.$message({
						type: 'success',
						message: '修改成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});
				});
			},
			editemail() {
				this.$prompt('请输入新邮箱', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputErrorMessage: '邮箱格式不正确'
				}).then(({
					value
				}) => {
					this.$axios({
						method: 'post',
						url: 'http://localhost:5000/user/change-email/'+this.$root.USER.id,
						data: {
							
							email: value
						}
					}).then(successResponse => {
						successResponse = JSON.parse(successResponse.request.responseText);
						console.log(successResponse)
						if (successResponse.code === 200) {
							this.$root.USER.email = successResponse.data.email;
							this.useremail = this.$root.USER.email
						}
					})
					this.$message({
						type: 'success',
						message: '修改成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});
				});
			},
			editpassword() {
				this.$confirm('将向' + this.$root.USER.email + '发送确认邮件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: 'http://localhost:5000/auth/forget-password',
						data: {
							email: this.$root.USER.email
						}
					}).then(successResponse => {
						console.log(successResponse)
						if (successResponse.data.code === 302) {
							this.$root.USER.name = null;
							this.$root.USER.email = null;
							this.$root.USER.id = null;
							this.$root.USER.confirmed = false;
							this.$router.push('login')
						}
					})
					this.$message({
						type: 'success',
						message: '请移步至邮箱确认邮件'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			beinvite() {
				this.$axios({
					method: 'post',
					url: 'http://localhost:5000/group/invite',
					data: {
						user_id: this.$root.USER.id,
						invite_code: this.input
					}
				}).then(successResponse => {
					successResponse = JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
				})
			},
			gotomain() {
				this.$router.push('main')
			}
		}
	}
</script>

<style>
	.el-button {
		font-size: 18px;
	}

	.el-row {
		margin-bottom: 20px;
		margin-top: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		font-size: 30px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
