<template>
	<div class="home">
		<el-row :gutter="0">
			<el-col :span="3" :offset="21" class="top">
				<el-button :span="3" type="primary" @click="gotologin">登录</el-button>
				<el-button :span="3" type="primary" plain @click="gotoregister">注册</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="7" class="t1">
				<div class="text text1">{{project_num}}</div>
				<div class="textt tt1">个作品</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="1" class="t2">
				<div class="text text2">{{task_num}}</div>
				<div class="textt tt2">道高质量题目</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="13" class="t3">
				<div class="text text3">{{user_num}}</div>
				<div class="textt tt3">注册用户</div>
			</el-col>
		</el-row>
		<el-row>
			<el-button :span="3" type="primary" round="true" class="enterbt">进入系统</el-button>
		</el-row>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				project_num: 111,
				task_num: 2222,
				user_num: 33333

			}
		},
		created() {
			Vue.axios.get('http://localhost:5000/home/').then((response) => {
				response=JSON.parse(response.request.responseText);
				if (response.code === 200) {
					this.project_num = response.data.project_num,
						this.task_num = response.data.task_num,
						this.user_num = response.data.user_num
				}
			})
		},
		methods: {
			gotologin() {
				this.$router.push('login')
			},
			gotoregister() {
				this.$router.push('register')
			}
		},
	};
</script>
