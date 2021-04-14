<template>
  <el-container>
    <el-header>
      顶部
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-dropdown split-button type="primary" @click="handleClick" @command="handleCommand">
          选择题目
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">题目1</el-dropdown-item>
            <el-dropdown-item command="b">题目2</el-dropdown-item>
            <el-dropdown-item command="c">题目3</el-dropdown-item>
            <el-dropdown-item command="d">题目4</el-dropdown-item>
            <el-dropdown-item command="e">题目5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <video
              width="360"
              height="240"
              src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              autoplay
              controls
              preload="auto"
          ></video>
        </el-col>
        <el-col :span="12">
          <h1>评分</h1>
          <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900">
          </el-rate>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <h1>教师点评</h1>
        <p>巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉啦，巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉啦，巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉啦</p>
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
  data() {
    return {
      value: 3.7,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
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

</style>
