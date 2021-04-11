<template>
	<div class="login">
		<el-form class="form" :rules="rules" :model="form" ref="form">
			<h3>登录</h3>
			<el-form-item label="邮箱" label-width="80px" prop="email">
				<el-input class="item" v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="密码" label-width="80px" prop="password">
				<el-input class="item" type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'App',
		components: {},
		created() {
			Vue.axios.get('http://localhost:5000/users').then((response) => {
				if (response.status === 200) {
					// alert(response.data.name)
				}
			})
		},
		data() {
			return {
				form: {},
				rules: {
					email: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						},
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
					]
				}
			}
		},
		methods: {
			onSubmit() {
				this.$axios({
					method: 'post',
					url: 'http://localhost:5000/auth/login',
					data:{
						email:this.form.email,
						password:this.form.password,
						// email:"xute616413350@163.com",
						// password:"wangzhe56123",
					}
				}).then(successResponse => {
					successResponse=JSON.parse(successResponse.request.responseText);
					console.log(successResponse)
					// if(successResponse.code === 200){
					// 	this.$router.push('main')
					// }
				})
			}
		},
	}
</script>

<style scoped>
	.login {
		background-color: #bcdef3;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form {
		width: 40%;
		margin-bottom: 20vh;
		background-color: white;
		border-radius: 2px;
		padding: 5% 3%;
	}

	.item {
		width: 75%;
	}
</style>
