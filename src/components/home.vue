<template>
	<div class="home">
		<el-row :gutter="0">
			<!-- 			<el-col :span="6">
				<div class="grid-content bg-purple">1</div>
			</el-col> -->
			<el-col :span="3" :offset="21" class="top">
				<el-button :span="3" type="primary">登录</el-button>
				<el-button :span="3" type="primary" plain>注册</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="7" class="t1">
				<div class="text text1">XXXXXXX</div>
				<div class="textt tt1">任教师</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="1" class="t2">
				<div class="text text2">XXXXXXXX</div>
				<div class="textt tt2">道高质量题目</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="10" :offset="13" class="t3">
				<div class="text text3">XXXXXXX</div>
				<div class="textt tt3">注册用户</div>
			</el-col>
		</el-row>
		<el-row>
			<el-button :span="3" type="primary" round="true" class="enterbt">进入系统</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	.t1,.t2,.t3{
		color: white;
	}
	.t1{
		margin-top:8em;
	}
	.t2{
		margin-top: 15em;
	}
	.t3{
		margin-top: 8em;
	}
	.enterbt{
		font-size: 3em;
		width: 6em;
		height: 2em;
		margin-top: 2em;
	}
	.text{
		font-size: 4em;
		display: inline;
	}
	.textt{
		font-size: 2em;
		display: inline;
	}
	.home{
		height: 78em;
		background-color: #42B983;
	}
	.top{
		margin-top:20px;
	}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}
</style>
