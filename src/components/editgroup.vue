<template>
	<el-container>
		<!-- <input type="file" @change="handleFileUpdate" accept=".xlsx"> --><!-- 这是个上传文件的控件 -->
		<el-header>
			Header
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
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
							删除
						</el-button>
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
</style>
