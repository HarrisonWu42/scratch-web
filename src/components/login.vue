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
				<el-button style="font-size: ;" type="primary" @click="forgetpswd">忘记密码</el-button>
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
				if (response.code === 200) {
					console.log('Connect Success')
				}
			})
			if(this.$root.USER.name != null){
				alert("已有用户登录，即将跳转至主页");
				this.$router.push('main')
			}
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
			forgetpswd(){
				this.$router.push('forgetpswd')
			},
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
					if(successResponse.code === 200){
						this.$root.USER.name = successResponse.data.name
						this.$root.USER.email = successResponse.data.email
						this.$root.USER.id = successResponse.data.id
						this.$root.USER.confirmed = successResponse.data.confirmed
						console.log(this.$root.USER.name)
						console.log(this.$root.USER.email)
						console.log(this.$root.USER.id)
						console.log(this.$root.USER.confirmed)
						this.$router.push('main')
					}
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
