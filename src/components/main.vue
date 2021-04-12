<template>
	<div>
		<el-container style="border: 1px solid #eee;">
			<el-header style="text-align: right; font-size: 12px">

				<div v-if="usert" style="display: inline;">
					<span style="margin-right: 20px;font-size: 18px;">{{this.$root.USER.name}}</span>
					<el-button type="primary" @click="person">个人中心</el-button>
					<el-button type="primary" @click="quit">注销</el-button>
				</div>
				<div v-else style="display: inline;">
					<el-button type="primary" @click="gotologin">登录</el-button>
					<el-button type="primary" @click="gotoregister">注册</el-button>
				</div>
			</el-header>
			<el-container>
				<el-aside width="300px" style="background-color: rgb(238, 241, 246);">

					<div style="background-color: #FFFFFF;margin: 10px;">
						<div style="height: 30px;background-color: blue;"></div>
						<a style="display: block;margin: 10px;font-size: 20px; margin-top: 0;">作品:{{project_num}}</a>
						<a style="display: block;margin: 10px;font-size: 20px;">用户:{{user_num}}</a>
						<a style="display: block;margin: 10px;font-size: 20px;">题目:{{task_num}}</a>
					</div>
					<el-menu style="margin: 10px;">
						<el-menu-item index="1" @click="task">
							<i class="el-icon-menu"></i>
							<span slot="title">题目集</span>
						</el-menu-item>
						<el-menu-item index="2" @click="sclass">
							<i class="el-icon-menu"></i>
							<span slot="title">班级管理</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<div v-if="taskt">
						<el-table :data="tableData">
							<el-table-column prop="id" label="ID" width="140">
							</el-table-column>
							<el-table-column prop="date" label="日期" width="140">
							</el-table-column>
							<el-table-column prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column prop="address" label="地址">
							</el-table-column>
						</el-table>
					</div>
					<div v-if="classt">
						<el-button type="primary" @click="dialogFormVisible = true">创建班级</el-button>
						<el-table :data="tableData2">
							<el-table-column prop="name" label="班级名称" width="120" @click="gotoregister">
							</el-table-column>
							<el-table-column prop="description" label="班级描述">
							</el-table-column>
							<el-table-column prop="invite_code" label="邀请码">
							</el-table-column>
							<el-table-column prop="type" label="状态">
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-main>
			</el-container>
			<el-dialog title="创建班级" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item :rules="[{required:true,message:'班级名不能为空'}]" label="班级名称"
						:label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item :rules="[{required:true,message:'班级描述不能为空'}]" label="班级描述"
						:label-width="formLabelWidth">
						<el-input v-model="form.description" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="creategroup">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="修改班级信息" :visible.sync="dialogFormVisiblec">
				<el-form :model="form">
					<el-form-item :rules="[{required:true,message:'班级名不能为空'}]" label="班级名称"
						:label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item :rules="[{required:true,message:'班级描述不能为空'}]" label="班级描述"
						:label-width="formLabelWidth">
						<el-input v-model="form.description" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisiblec = false">取 消</el-button>
					<el-button type="primary" @click="editgroup">确 定</el-button>
				</div>
			</el-dialog>
		</el-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		created() {
			Vue.axios.get('http://localhost:5000/home/').then((response) => {
				response = JSON.parse(response.request.responseText);
				if (response.code === 200) {
					this.project_num = response.data.project_num[0],
						this.task_num = response.data.task_num[0],
						this.user_num = response.data.user_num[0]
				}
			})
			this.taskt = true;
			this.classt = false;
			this.usert = false;
			if (this.$root.USER.name != null) {
				this.usert = true;
				Vue.axios.get('http://localhost:5000/group/teacher/' + this.$root.USER.id + '/1/5').then((response) => {
					response = JSON.parse(response.request.responseText);
					if (response.code === 200) {
						console.log(response);
						this.tableData2 = response.data.groups;
						console.log(this.tableData2[1].name)
					}
				})
			}

		},
		data() {
			return {
				project_num: 111,
				task_num: 2222,
				user_num: 33333,

				taskt: true,
				classt: false,
				usert: false,

				dialogFormVisible: false,
				dialogFormVisiblec: false,

				groupid: null,
				form: {
					name: '',
					description: '',
				},
				formLabelWidth: '120px',

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableData2: [],
				search: ''
			}
		},
		methods: {
			handleEdit(index, row) {
				this.form.name = row.name;
				this.form.description = row.description;
				this.groupid = row.id;
				this.dialogFormVisiblec = true;
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			person() {
				this.$router.push('person')
			},
			editgroup() {
				this.dialogFormVisiblec = false;
				this.$axios({
					method: 'post',
					url: 'http://localhost:5000/group/edit',
					data: {
						id: this.groupid,
						name: this.form.name,
						description: this.form.description,
					}
				}).then(successResponse => {
					this.form.name = '';
					this.form.description = '';
					successResponse = JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
					Vue.axios.get('http://localhost:5000/group/teacher/' + this.$root.USER.id + '/1/5').then((
						response) => {
						response = JSON.parse(response.request.responseText);
						if (response.code === 200) {
							console.log(response);
							this.tableData2 = response.data.groups;
							console.log(this.tableData2[1].name)
						}
					})
				})

			},
			creategroup() {
				this.dialogFormVisible = false;
				this.$axios({
					method: 'post',
					url: 'http://localhost:5000/group/add',
					data: {
						name: this.form.name,
						description: this.form.description,
						teacher_id: this.$root.USER.id,
					}
				}).then(successResponse => {
					this.form.name = '';
					this.form.description = '';
					successResponse = JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
				})
			},
			quit() {
				this.$root.USER.name = null;
				this.$root.USER.email = null;
				this.$root.USER.id = null;
				this.$root.USER.confirmed = false;
				console.log(this.$root.USER.name)
				console.log(this.$root.USER.email)
				console.log(this.$root.USER.id)
				console.log(this.$root.USER.confirmed)
				this.$router.push('home')
			},
			task() {
				this.classt = false;
				this.taskt = true;
				this.$forceUpdate()
				console.log(this.taskt)
			},
			sclass() {
				this.taskt = false;
				this.classt = true;
				this.$forceUpdate()
				console.log(this.classt)
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			gotologin() {
				this.$router.push('login')
			},
			gotoregister() {
				this.$router.push('register')
			}
		}
	};
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>
