<template>
	<div class="forgetpswd">
		<el-form class="form" :rules="rules" :model="form" ref="form">
			<h3>找回密码</h3>
			<el-form-item label="邮箱" label-width="80px" prop="email">
				<el-input class="item" type="email" v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sentemail">发送验证邮件</el-button>
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
			Vue.axios.get('http://localhost:3000/users').then((response) => {
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
							message: "请输入邮箱",
							trigger: "blur"
						},
					],
				}
			}
		},
		methods: {
			// onSubmit() {
			//   this.$refs["form"].validate(valid => {
			//     if (valid) {
			//       this.$router.push("/home");
			//     } else {
			//       return false;
			//     }
			//   });
			// }
			sentemail() {
				this.$axios({
					method: 'post',
					url: 'http://localhost:5000/auth/forget-password',
					data:{
						email:this.form.email
					}
				}).then(successResponse => {
					console.log(successResponse)
					if(successResponse.data.code === 302){
						this.$router.push('login')
					}
				})
			}
		},
	}
</script>

<style scoped>
	.forgetpswd {
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
