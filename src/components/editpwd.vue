<template>
  <el-container class="background">
    <el-header class="header">
      <div class="icon" style="display: inline">
        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>
      </div>
    </el-header>
    <el-card class="card">
      <el-form ref="form" :model="form" label-width="80px" style="margin-left: 450px">
        <el-form-item label="新密码">
          <el-input class="editpwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input class="editpwd"></el-input>
        </el-form-item>
<!--        <p><el-button type="primary" @click="onSubmit" style="margin-left: 500px">确认</el-button></p>-->
      </el-form>
      <p><el-button type="primary" @click="gotohome" style="margin-left: 520px">确认修改</el-button></p>
<!--      <el-form>-->
<!--        <el-button type="primary" @click="gotohome">确认修改</el-button>-->
<!--      </el-form>-->

    </el-card>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      token:''
    }
  },
  created() {


  },
  methods:{
    gotohome(){
      this.$router.push("home");
    }
    // async onSubmit(){
    //   this.token=this.$route.params.usercode
    //   console.log(this.token);
    //   Vue.axios.get("http://localhost:5000/auth/confirm/" + this.$route.params.usercode).then((response) => {
    //     console.log(response);
    //   });
    //   // setTimeout(function () {
    //   //   this.$router.push('../../home')
    //   // }, 1000)
    //   this.$router.push('../../home')
    // },
  }
}
</script>

<style scoped>
.background {
  height: 100%;
  background-color: hsl(203, 33%, 95%);
}

* {
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: var(--text-normal);
  --tw-ring-color: rgba(147, 197, 253, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  box-sizing: border-box;
}
.header {
  color: #333;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
  /* position: fixed;
  top: 0;
  z-index: 9999; */
  background-color: #fff;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
}
.icon{
  float: left;
}
.card{
  width: 96%;
  margin: 20px;
}
div{
  float: left;
  margin-left: 30px;
  font-size: 30px;
  /*font-family: 楷体;*/
  font-weight: bold;
}
div p{
  margin: 20px;
}
</style>
