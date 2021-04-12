<template>
	<div class="person">
		个人中心
	</div>
</template>

<script>
	export default {
		created() {
			if (this.$root.USER.name == null) {
				alert("未登录，请先登录");
				this.$router.push('login')
			}
		},
	}
</script>

<style>
</style>
