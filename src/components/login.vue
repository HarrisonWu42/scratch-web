<template>
	<div class="login">
		<el-form class="form" :rules="rules" :model="form" ref="form">
			<h3>登录</h3>
			<el-form-item label="用户名" label-width="80px" prop="name">
				<el-input class="item" v-model="form.name"></el-input>
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
				value: 3.7,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				form: {},
				rules: {
					name: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						},
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 12,
							message: "长度在 6 到 12 个字符",
							trigger: "blur"
						}
					]
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
			onSubmit() {
				this.$axios({
					method: 'get',
					url: 'http://localhost:5000/'
				}).then(successResponse => {
					console.log(successResponse)
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
