<template>
  <el-container>
    <el-header class="header">
      <el-button type="primary" icon="el-icon-arrow-left" @click="handleBackClick">返回</el-button>
      <h1>题目名称：{{ this.taskData.name }}</h1>
      <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-dropdown split-button type="primary" @click="handleClick" @command="getTaskProjectData">
          选择题目
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="project in projects"
                              :key="project.id"
                              :command="project.id">
              题目id:{{ project.id }}
              题目名称:{{ project.name }}
              创建时间:{{ project.commit_timestamp }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <video
              width="360"
              height="240"
              :src="url"
              autoplay
              controls
              preload="auto"
          ></video>
        </el-col>
        <el-col :span="12">
          <h1>评分</h1>
          <el-row>
            <h1>分数</h1>
            <el-rate
                v-model="projectData.score"
                disabled
                show-score
                text-color="#ff9900">
            </el-rate>
          </el-row>
          <el-row>
            <h1>逻辑性</h1>
            <el-rate
                v-model="projectData.logicality"
                max="1"
                disabled
                show-score
                text-color="#ff9900">
            </el-rate>
          </el-row>
          <el-row>
            <h1>工作量</h1>
            <el-rate
                v-model="projectData.workload"
                max="100"
                disabled
                show-score
                text-color="#ff9900">
            </el-rate>
          </el-row>
          <el-row>
            <h1>程序复杂度</h1>
            <el-rate
                v-model="projectData.complexity"
                max="100"
                disabled
                show-score
                text-color="#ff9900">
            </el-rate>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <h1>教师点评</h1>
        <p>{{ projectData.comment }}</p>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :file-list="fileList"
              limit="1"
              :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="6">
          <el-button size="small" type="primary">下载</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "TaskItem",
  created() {
    this.getTaskItemData()
    this.getTaskProjectsData()
  },
  data() {
    return {
      url: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      taskData: {
        answer_video_url: '',
        description: '',
        id: null,
        name: ''
      },
      projects: [
        {
          commit_timestamp: null,
          id: null,
          name: null
        }
      ],
      projectData: {
        comment: "x",
        complexity: 1,
        id: 1,
        logicality: 1,
        name: "作品",
        score: 5,
        workload: 1
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    handleBackClick() {
      this.$router.back()
    },
    getTaskItemData() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:5000/task/' + this.$route.params.taskid,
      }).then(response => {
        this.taskData = response.data.data
      })
    },
    getTaskProjectsData() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:5000/task/project/' + this.$root.USER.id + '/' + this.$route.params.taskid,
      }).then(response => {
        this.projects = response.data.data.projects
      })
    },
    getTaskProjectData(projectId) {
      this.$axios({
        method: 'get',
        url: 'http://localhost:5000/project/' + projectId,
      }).then(response => {
        this.projectData = response.data.data
      })
    },
    handleClick() {
      alert('button click');
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定从 ${fileList} 移除 ${file.name} ？`);
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
