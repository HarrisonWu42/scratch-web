<template>
	<div class="forgetpswd">
		<el-form class="form" :rules="rules" :model="form" ref="form">
			<h3>找回密码</h3>
			<el-form-item label="邮箱" label-width="80px" prop="email">
				<el-input class="item" type="email" v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">发送验证邮件</el-button>
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
				value: 3.7,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				form: {},
				rules: {
					email: [{
							required: true,
							message: "请输入邮箱",
							trigger: "blur"
						},
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						}
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
			onSubmit() {
				this.$axios({
					method: 'get',
					url: 'http://localhost:5000/demo'
				}).then(successResponse => {
					console.log(successResponse)
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
