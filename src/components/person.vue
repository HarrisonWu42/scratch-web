<template>
  <el-container>
    <el-header class="header">
      <div class="icon" style="display: inline">
        <img src="../assets/icon.png" alt="" style="height: 50px; margin-top: 5px;"/>
      </div>
      <div v-if="usert" style="display: inline">
        <span style="margin-right: 20px; font-size: 18px">{{ this.$root.USER.name }}</span>
        <el-button type="primary" @click="person">个人中心</el-button>
        <el-button type="primary" @click="quit">注销</el-button>
      </div>
      <div v-else style="display: inline">
        <el-button type="primary" @click="gotologin">登录</el-button>
        <el-button type="primary" @click="gotoregister">注册</el-button>
      </div>
    </el-header>
    <el-main class="main" style="margin-top: 100px;">
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple">昵称：</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ username }}</div>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" plain @click="editname">修改昵称</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple">邮箱地址：</div>
        </el-col>
        <el-col :span="3" :offset="1">
          <div class="grid-content bg-purple">{{ useremail }}</div>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" plain @click="editemail">修改邮箱</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple">密码管理：</div>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="danger" plain @click="editpassword">重置密码</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple">邀请码：</div>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="input" placeholder="请输入邀请码"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" plain @click="beinvite">接受邀请</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 80px">
        <el-button type="primary" @click="gotomain">返回主页</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  created() {
    this.username = this.$root.USER.name;
    this.useremail = this.$root.USER.email;
    this.usert = false;
    if (this.$root.USER.name != null) {
      this.usert = true;
      this.getgroup();
      this.getTaskSetList();
    } else {
      this.getTaskSetList();
    }
  },
  data() {
    return {
      username: null,
      useremail: null,
      input: ''
    }
  },
  methods: {

    person() {
      this.$router.push("person");
    },
    quit() {
      this.$root.USER.name = null;
      this.$root.USER.email = null;
      this.$root.USER.id = null;
      this.$root.USER.confirmed = false;
      console.log(this.$root.USER.name);
      console.log(this.$root.USER.email);
      console.log(this.$root.USER.id);
      console.log(this.$root.USER.confirmed);
      this.$router.push("home");
    },
    goBack() {
      this.$router.back()
    },
    gotologin() {
      this.$router.push("login");
    },
    gotoregister() {
      this.$router.push("register");
    },
    editname() {
      this.$prompt('请输入新昵称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
                 value
               }) => {
        this.$axios({
          method: 'post',
          url: 'http://localhost:5000/user/edit-name/' + this.$root.USER.id,
          data: {
            name: value
          }
        }).then(successResponse => {
          successResponse = JSON.parse(successResponse.request.responseText);
          if (successResponse.code === 200) {
            console.log(successResponse)
            this.$root.USER.name = successResponse.data.name;
            this.username = this.$root.USER.name;
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    editemail() {
      this.$prompt('请输入新邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({
                 value
               }) => {
        this.$axios({
          method: 'post',
          url: 'http://localhost:5000/user/change-email/' + this.$root.USER.id,
          data: {

            email: value
          }
        }).then(successResponse => {
          successResponse = JSON.parse(successResponse.request.responseText);
          console.log(successResponse)
          if (successResponse.code === 200) {
            this.$root.USER.email = successResponse.data.email;
            this.useremail = this.$root.USER.email
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    editpassword() {
      this.$confirm('将向' + this.$root.USER.email + '发送确认邮件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: 'http://localhost:5000/auth/forget-password',
          data: {
            email: this.$root.USER.email
          }
        }).then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 302) {
            this.$root.USER.name = null;
            this.$root.USER.email = null;
            this.$root.USER.id = null;
            this.$root.USER.confirmed = false;
            this.$router.push('login')
          }
        })
        this.$message({
          type: 'success',
          message: '请移步至邮箱确认邮件'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    beinvite() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:5000/group/invite',
        data: {
          user_id: this.$root.USER.id,
          invite_code: this.input
        }
      }).then(successResponse => {
        successResponse = JSON.parse(successResponse.request.responseText);
        console.log(successResponse)
      })
    },
    gotomain() {
      this.$router.push('main')
    }
  }
}
</script>

<style scoped>
.main > .el-row {
  margin-bottom: 20px;
}
</style>
