<template>
  <el-container>
    <el-header class="header">
      <!-- <el-button
        type="primary"
        icon="el-icon-arrow-left"
        @click="handleBackClick"
        >返回</el-button
      > -->
      <el-row :gutter="10">
        <h1 class="big" style="float: left">任务：{{ this.taskData.name }}</h1>
        <el-dropdown
        style="margin-left: 20px;"
          split-button
          type="primary"
          @click="handleClick"
          @command="getTaskProjectData"
        >
          提交版本
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="project in projects"
              :key="project.id"
              :command="project.id"
            >
              题目id:{{ project.id }} 题目名称:{{ project.name }} 创建时间:{{
                project.commit_timestamp
              }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
    </el-header>

    <el-main>
      <!-- <el-row :gutter="10">
        <el-dropdown
          split-button
          type="primary"
          @click="handleClick"
          @command="getTaskProjectData"
        >
          选择题目
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="project in projects"
              :key="project.id"
              :command="project.id"
            >
              题目id:{{ project.id }} 题目名称:{{ project.name }} 创建时间:{{
                project.commit_timestamp
              }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row> -->
      <el-row :gutter="10">
        <el-col :span="12">
          <video
            width="540"
            height="320"
            :src="url"
            autoplay
            controls
            preload="auto"
          ></video>
        </el-col>
        <el-col :span="12" class="card">
          <br />
          <el-row>
            <strong class="title big">智能评测</strong>
          </el-row>
          <br />
          <el-row>
            <h1 class="title">评分</h1>
            <el-rate
              class="content"
              v-model="projectData.score"
              disabled
              show-score
              text-color="#ff9900"
            >
            </el-rate>
          </el-row>
          <br />
          <el-row>
            <h1 class="title">逻辑性</h1>
            <el-progress
              class="content"
              :text-inside="true"
              :stroke-width="26"
              :percentage="projectData.logicality * 100"
              :format="format"
            />
          </el-row>
          <br />
          <el-row>
            <h1 class="title">工作量</h1>
            <el-progress
              class="content"
              :text-inside="true"
              :stroke-width="26"
              :percentage="projectData.workload * 78"
              :format="format"
            />
          </el-row>
          <br />
          <el-row>
            <h1 class="title">复杂度</h1>
            <el-progress
              class="content"
              :text-inside="true"
              :stroke-width="26"
              :percentage="projectData.complexity * 30"
              :format="format"
            />
          </el-row>
          <br />
          <br />
          <el-row>
            <input
              v-show="false"
              id="uploadFileInput"
              type="file"
              @change="handleFileUpdate"
              accept=".sb3"
            />
            <el-button size="small" type="primary" @click="handleUploadClick"
              >点击上传</el-button
            >
            <el-button size="small" type="primary" @click="handleDownloadClick"
              >下载</el-button
            >
            <el-button size="small" type="primary" @click="handleTestClick"
              >测评</el-button
            >
            <el-button size="small" type="primary" @click="handleEdit()">老师评分</el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-divider></el-divider>
        <h1 class="big" style="float: left">教师点评</h1>
        <br /><br />
        <p style="float: left">{{ projectData.comment }}</p>
      </el-row>
      <!-- <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <input
            v-show="false"
            id="uploadFileInput"
            type="file"
            @change="handleFileUpdate"
            accept=".sb3"
          />
          <el-button size="small" type="primary" @click="handleUploadClick"
            >点击上传</el-button
          >
        </el-col>
        <el-col :span="6">
          <el-button size="small" type="primary" @click="handleDownloadClick"
            >下载</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-button size="small" type="primary" @click="handleTestClick"
          >测评</el-button
        >
      </el-row> -->
    </el-main>

    <el-dialog title="评价" :visible.sync="dialogFormVisible1">
      <el-form :model="projectData">
        <el-form-item :rules="[{ required: true, message: '评价星级不能为空' }]" label="评价星级" :label-width="formLabelWidth">
          <el-input v-model="projectData.score" ></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '评价不能为空' }]" label="老师评价" :label-width="formLabelWidth">
          <el-input v-model="projectData.comment" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editgroup()">确 定</el-button>
      </div>
      <!--      <div slot="footer" class="dialog-footer">-->
      <!--        <el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
      <!--        <el-button type="primary" @click="editgroup">确 定</el-button>-->
      <!--      </div>-->
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  name: "TaskItem",
  created() {
    this.getTaskAllProjectDatas()
    this.getTaskItemData();
    this.getTaskProjectsData();
  },
  data() {
    return {
      url:
        "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
      taskData: {
        answer_video_url: "",
        description: "",
        id: null,
        name: "比尔与野兽      ",
      },
      pro:[],
      projectDetail: {},
      AllprojectDatas: [],
      projects: [
        {
          commit_timestamp: null,
          id: null,
          name: null,
        },
      ],
      projectData: {
        comment: "暂无评论，请选择版本",
        complexity: 0,
        id: 0,
        logicality: 0,
        name: "暂无作品",
        score: 0,
        workload: 0,
      },
      formLabelWidth: "120px",
      dialogFormVisible1:false
    };
  },
  methods: {
    format(percentage) {
      return `${percentage}`;
    },
    handleBackClick() {
      this.$router.back();
    },
    handleEdit(){
      this.dialogFormVisible1=true
    },
    getTaskItemData() {
      this.$axios({
        method: "get",
        url: "http://localhost:5000/task/" + this.$route.params.taskid,
      }).then((response) => {
        this.taskData = response.data.data;
      });
    },
    getTaskProjectsData() {
      this.$axios({
        method: "get",
        url:
          "http://localhost:5000/task/project/" +
          this.$root.USER.id +
          "/" +
          this.$route.params.taskid,
      }).then((response) => {
        this.projects = response.data.data.projects;
      });
    },
    getTaskAllProjectDatas(){
      this.$axios({
        method: "get",
        url: "http://localhost:5000/task/project/" +this.$root.USER.id+"/"+ this.taskData.id,
      }).then((response) => {
        this.AllprojectDatas = response.data.data;
      });
    },
    getTaskProjectData(projectId) {
      this.$axios({
        method: "get",
        url: "http://localhost:5000/project/" + projectId,
      }).then((response) => {
        this.projectData = response.data.data;
      });
    },
    editgroup(){
      this.dialogFormVisible1 = false;
      this.$axios({
        method: "post",
        url: "http://localhost:5000/project/evaluate-correct",
        data: {
          id: this.projectData.id,
          score: this.projectData.score,
          comment: this.projectData.comment,
        },
      }).then((successResponse) => {
        successResponse = JSON.parse(successResponse.request.responseText);
        if (successResponse.code === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'warning',
            duration: 2000
          })
        }
      });
    },
    handleClick() {
      alert("button click");
    },
    handleUploadClick() {
      document.getElementById("uploadFileInput").click();
    },
    handleFileUpdate(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("user_id", this.$root.USER.id);
      formData.append("task_id", this.$route.params.taskid);
      formData.append("file", file, file.name);
      this.$axios({
        method: "post",
        url: "http://localhost:5000/project/upload",
        data: formData,
      }).then((response) => {
        console.log(response);
      });
    },
    handleDownloadClick() {
      this.$axios({
        method: "get",
        url: "http://localhost:5000/project/download/" + this.projectData.id,
      }).then((response) => {
        console.log(response);
      });
    },
    handleTestClick() {},
  },
};
</script>
<style>
body {
  background-color: hsl(203, 33%, 95%);
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
}

.card {
  margin-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  text-align: left;
  background-color: #fff;
}
.big {
  font-size: 1.5rem;
}

.title {
  float: left;
  width: 100px;
}

.content {
  float: left;
  width: 80%;
}
</style>
