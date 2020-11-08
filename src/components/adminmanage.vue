<template>
    <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=1, initial-scale=1.0">
          <title>管理页面</title>
      </head>
      <body>
        <el-tabs tab-position="left" style="height: 100%;">
          <el-tab-pane label="个人资料">管理个人资料</el-tab-pane>
          <el-tab-pane label="用户管理">添加文章</el-tab-pane>
          <el-tab-pane label="配置管理">管理文章</el-tab-pane>
        </el-tabs>
      </body>
    </html>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped>
  * {
    padding: 0px;
    margin: 0px;
  }
  html, body {
    width: 100%;
    height: 100%;
  }
</style>
