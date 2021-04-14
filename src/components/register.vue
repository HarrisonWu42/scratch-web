<template>
	<div class="register">
		<el-form class="form" :rules="rules" :model="form" ref="form">
			<h3>注册</h3>
			<el-form-item label="邮箱" label-width="80px" prop="email">
				<el-input class="item" v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="密码" label-width="80px" prop="password">
				<el-input class="item" type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="重复密码" label-width="80px" prop="repassword">
				<el-input class="item" type="password" v-model="form.repassword"></el-input>
			</el-form-item>
			<el-form-item label="昵称" label-width="80px" prop="name">
				<el-input class="item" type="name" v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">注册</el-button>
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
			Vue.axios.get('http://localhost:5000/home/').then((response) => {
				response=JSON.parse(response.request.responseText);
				console.log(response)
			})
		},
		data() {
			return {
				form: {},
				rules: {
					email: [{
							required: "true",
							message: "请输入邮箱",
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
					url: 'http://localhost:5000/auth/register',
					data:{
						name:this.form.name,
						email:this.form.email,
						password:this.form.password,
						password2:this.form.repassword,
					}
				}).then(() => {
					this.$router.push('/')
				})
			}
		},
	}
</script>

<style>
	.register {
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
