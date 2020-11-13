<template>
    <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=1, initial-scale=1.0">
          <title>修改文章</title>
      </head>
      <body>
        <div>
            <p>标题：</p><input id="title"><br>
            <div ref="editorarea" id="editorarea">
            </div>
            <button @click="Editblog">提交</button>
        </div>
      </body>
    </html>
</template>
<script>
import E from 'wangeditor'
import axios from 'axios'
export default {
  data: function () {
    return {
      editblogcontent: '',
      blognow: '',
      title: ''
    }
  },
  mounted () {
    var me = this
    var editor = new E(document.getElementById('editorarea'))
    editor.config.height = 500
    editor.config.zIndex = 1
    // var text1 = document.getElementById('text1')
    editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
      me.editblogcontent = editor.txt.html()
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
            'token': localStorage.getItem('token'),
            'puberaccount': window.account
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
    // 通过此来写入初始值
    // text1.val(editor.txt.html())
    // console.log(editor.txt.text())
    this.Initvalue()
    editor.txt.html(this.editblogcontent)
    document.getElementById('title').value = this.editblogcontent.Title
  },
  methods: {
    Initvalue: async function () {
      var geturl = 'http://localhost:8090/blog/getspecificblog?id=' + this.$route.query.blog_id
      var blogmes = await this.$sendaxios('get', geturl, '')
      this.editblogcontent = blogmes.result
    },
    Editblog: function () {
    }
  }
}
</script>
<style scoped>
</style>
