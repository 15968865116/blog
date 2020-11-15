<template>
    <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=1, initial-scale=1.0">
          <title>管理页面</title>
      </head>
      <body>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="个人资料" name="1" style="text-align:center">
            <div style="width:50%;float:left">
              <p>头像 </p><div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
              <p>昵称:{{usermessage.name}}</p>
              <p>联系方式</p>
              <p>标签</p>
              <p>简介</p>
            </div>
            <div style="width:50%;float:right">
              <h4>修改个人资料</h4>
              <input type="file"
               accept="image/*"
               @change="chooseImg" />
              <p>昵称:<input></p>
              <p>联系方式<input></p>
              <p>标签<input></p>
              <p>简介<input></p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="新增文章" name="2">
            <div id="addnew">
              <p><el-input v-model="title" placeholder="请输入标题"></el-input></p>
              <p>内容:</p><div ref="editorarea" id="editorarea">
              </div>
            </div><br>
            <el-button type="success" @click="Addnewblog" size="medium">新增博文</el-button>
          </el-collapse-item>
          <el-collapse-item title="管理文章" name="3" style="text-align:center">
            <div v-for="row in blogmessage" :key="row.ID">
              <div>
                <a>{{row.Title}}</a>
                <el-button type="primary" size="small" @click="Editblog(row.ID)" style="float:right">修改</el-button>
                <el-button type="warning" size="small" style="float:right">删除</el-button>
              </div>
              <el-divider></el-divider>
            </div>
          </el-collapse-item>
        </el-collapse>
      </body>
    </html>
</template>
<script>
import E from 'wangeditor'
import axios from 'axios'
export default {
  data: function () {
    return {
      base64: '',
      blogcontent: '',
      usermessage: {},
      blogmessage: [],
      title: '',
      acc: '',
      activeNames: ['1'],
      data: '',
      imageUrl: '',
      Imageco: '',
      squareUrl: ''
    }
  },
  mounted () {
    var me = this
    this.$getbasicmessage(this.$route.query.useracc)
    this.acc = this.$route.query.useracc
    if (!this.$route.query.useracc) {
      me.$message.error('请重新登录')
    }
    var editor = new E(document.getElementById('editorarea'))
    editor.config.height = 300
    editor.config.zIndex = 1
    // var text1 = document.getElementById('text1')
    editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
      me.blogcontent = editor.txt.html()
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
            'puberaccount': me.acc
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
  },
  methods: {
    // T添加新的文章
    Addnewblog: function () {
      var me = this
      var config = {
        method: 'post',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service',
        url: 'http://localhost:8090/blog/createblog',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: {
          'title': this.title,
          'puber': this.usermessage.name,
          'puberaccount': this.$route.query.useracc,
          'content': this.blogcontent,
          'token': localStorage.getItem('token')
        }}
      axios(config)
        .then(function (response) {
          if (response.data.code === 1) {
            me.$message({
              message: response.data.msg,
              type: 'success'
            })
          } else {
            me.$message.error(response.data.msg)
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    Editblog: function (id) {
      this.$router.push({path: '/editblog', query: {blog_id: id}})
    },
    handleChange: function (val) {
      console.log(val)
    },
    chooseImg (event) {
      let file = event.target.files[0]
      console.log(file)
      var me = this
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        // 这里的e.target就是reader
        // console.log(reader.result)
        // reader.result就是图片的base64字符串
        var config = {
          method: 'post',
          // url: 'http://175.24.28.202:8000/api/v1/subs_service',
          url: 'http://localhost:8090/picture/portrait',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            // 'Host': 'http://175.24.28.202:80'
          },
          data: {
            'img': reader.result,
            'token': localStorage.getItem('token'),
            'puberaccount': me.acc
          }}
        axios(config)
          .then(function (response) {
            if (response.data.code === 1) {
              me.squareUrl = response.data.urlpath
            } else {
              window.alert('插入失败')
            }
          })
      }
    }
  }
}
</script>
<style scoped>
  html, body {
    width: 100%;
    height: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
