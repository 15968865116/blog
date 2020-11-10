<template>
    <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=1, initial-scale=1.0">
          <title>管理页面</title>
      </head>
      <body>
        <el-tabs tab-position="left" style="height: 100%;">
          <el-tab-pane label="个人资料">
            <p>头像</p>
            <p>昵称</p>
            <p></p>
            <p></p>
            <p></p>
          </el-tab-pane>
          <el-tab-pane label="用户管理">
            <p>标题:<input></p>
            <p>内容:</p><div ref="editorarea" id="editorarea">
              <p>初始化的内容</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置管理">管理文章</el-tab-pane>
        </el-tabs>
      </body>
    </html>
</template>
<script>
import E from 'wangeditor'
import axios from 'axios'
export default {
  data () {
    return {
      base64: '',
      blogcontent: ''
    }
  },
  mounted () {
    var editor = new E(document.getElementById('editorarea'))
    editor.config.height = 500
    // var text1 = document.getElementById('text1')
    editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
      this.blogcontent = editor.txt.html()
    }
    // 菜单
    editor.config.menus = [
      'bold',
      'head',
      'link',
      'italic',
      'underline',
      'image',
      'code'
    ]
    editor.config.showLinkImg = false
    // 配置 server 接口地址
    editor.config.uploadImgServer = 'http://localhost:8090/picture/blog'
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      let reader = new FileReader()
      // 读取图片
      reader.readAsDataURL(resultFiles[0])
      // 读取完毕后的操做
      reader.onload = function (e) {
        // 这里的e.target就是reader
        // console.log(reader.result)
        // reader.result就是图片的base64字符串
        this.base64 = e.target.result
        var config = {
          method: 'post',
          // url: 'http://175.24.28.202:8000/api/v1/subs_service',
          url: 'http://localhost:8090/picture/blog',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            // 'Host': 'http://175.24.28.202:80'
          },
          data: {
            'img': reader.result,
            'token': 'tokenxinxi',
            'puberaccount': 'puberaccount'
          }}
        axios(config)
          .then(function (response) {
            if (response.data.code === 1) {
              insertImgFn(response.data.urlpath)
            } else {
              window.alert('插入失败')
            }
          })
      }
    }
    // 颜色
    editor.config.colors = [
      '#000000',
      '#eeece0',
      '#1c487f',
      '#4d80bf'
    ]
    // 字体
    editor.config.fontNames = [
      '黑体',
      '仿宋',
      '楷体',
      '标楷体',
      '华文仿宋',
      '华文楷体',
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana',
      'Times New Roman',
      'Courier New'
    ]
    editor.create()
    // text1.val(editor.txt.html())
    console.log(editor.txt.text())
  },
  methods: {
    // T添加新的文章
    // Addnewblog: function () {
    //   var config = {
    //     method: 'post',
    //     // url: 'http://175.24.28.202:8000/api/v1/subs_service',
    //     url: 'http://localhost:8090/picture/blog',
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8'
    //       // 'Host': 'http://175.24.28.202:80'
    //     },
    //     data: {
    //       'title': 'tt',
    //       'puber': 'name',
    //       'puberaccount': 'puberaccount',
    //       'content': this.blogcontent,
    //       'token': 'token'
    //     }}
    // }
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
  /* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul, ol {
  margin: 10px 0 10px 20px;
}
</style>
