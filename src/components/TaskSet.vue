<template>
  <el-container>
    <el-header class="header">
      <el-button type="primary" icon="el-icon-arrow-left" @click="handleBackClick">返回</el-button>
      <h1>题目集列表</h1>
      <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        题目集名称：{{ taskSetData.name }}
      </el-aside>
      <el-main>
        <el-table
            :data="tableData"
            stripe
            @row-dblclick='handleTaskItemClick'
            style="width: 100%">
          <el-table-column
              prop="id"
              label="id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="题目名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="answer_video_url"
              label="题目演示地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "TaskSet",
  created() {
    this.taskSetData.id = this.$route.params.tasksetid
    this.getTaskSetList()
  },
  data() {
    return {
      taskSetData: {
        id: null,
        name: null,
        type: null
      },
      tableData: []
    }
  },
  methods: {
    handleBackClick() {
      this.$router.back()
    },
    getTaskSetList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:5000/taskset/task/' + this.taskSetData.id + '/1/5',
      }).then(response => {
        this.tableData = response.data.data.tasks
      })
    },
    handleTaskItemClick(e) {
      this.$router.push('/taskset/' + this.taskSetData.id + '/task/' + e.id)
    }
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
