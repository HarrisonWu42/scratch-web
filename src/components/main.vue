<template>
	<el-container style="border: 1px solid #eee">
		<el-aside width="300px" style="background-color: rgb(238, 241, 246)">
			
			<el-menu>
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">题目集</span>
				</el-menu-item>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">班级管理</span>
				</el-menu-item>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>用户名称显示在这里</span>
			</el-header>

			<el-main>
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
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			const item = {
				user: [{
						id: '1',
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: '2',
						date: '2016-05-02',
						name: '王虎',
						address: '上海市普陀区 1518 弄'
					},
				],
			};
			return {
				tableData: Array(10).filter(item.user)
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
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
