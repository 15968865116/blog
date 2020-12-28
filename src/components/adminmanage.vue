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
            <div style="width:100%">
              <p>头像 </p><div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
              <h4>修改个人资料</h4>
              <p>上传头像</p>
              <div class="inputimg">
              <input type="file" class="betterhidden"
               accept="image/*"
               @change="chooseImg" />
              </div>
              <p>
                <label>昵称:</label>
                <el-input
                  style = "width:80%;"
                  placeholder="请输入昵称"
                  v-model="udname"
                  clearable>
                </el-input>
              </p>
              <p>
                <label>邮箱:</label>
                <el-input
                  style = "width:80%;"
                  placeholder="请输入邮箱"
                  v-model="udemail"
                  clearable>
                </el-input>
              </p>
              <p>
                <label>标签:</label>
                <el-input
                  style = "width:80%;"
                  placeholder="请输入标签"
                  v-model="udtag"
                  clearable>
                </el-input>
              </p>
              <p>
                <label>简介:</label>
                <el-input
                  style = "width:80%;"
                  placeholder="请输入简介"
                  v-model="udintro"
                  clearable>
                </el-input>
              </p>
              <el-button type="success" size="small" @click="updateuser">更新</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="新增文章" name="2">
            <div id="addnew">
              <p><el-input v-model="title" placeholder="请输入标题"></el-input></p><br>
              <p><font>请选择文章分类</font>
                  <el-select
                    v-model="valueforcategory"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章标签">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </p>
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
      valueforcategory: '',
      options: [{'lable': 'aaa', 'value': 'bbb'},
        {'lable': 'aaa', 'value': 'aaas'},
        {'lable': 'aaa', 'value': 'none'}],
      base64: '',
      blogcontent: '',
      usermessage: {},
      blogmessage: {},
      title: '',
      acc: '',
      activeNames: ['1'],
      data: '',
      imageUrl: '',
      Imageco: '',
      squareUrl: '',
      udtag: '',
      udintro: '',
      udemail: '',
      udname: '',
      editor: null
    }
  },
  mounted: function () {
    this.getbasicmessage(this.$route.query.useracc)
    var me = this
    this.acc = this.$route.query.useracc
    if (!this.$route.query.useracc) {
      me.$message.error('请重新登录')
    }
    this.Initeditor()
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
          'categoryName': this.valueforcategory,
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
      this.title = ''
      this.blogcontent = ''
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
            console.log(response)
            if (response.data.code === 1) {
              me.squareUrl = response.data.urlpath
              console.log(me.squareUrl)
            } else {
              window.alert('插入失败')
            }
          })
      }
    },
    updateuser: function () {
      var datare = {
        'account': this.$route.query.useracc,
        'token': localStorage.getItem('token'),
        'name': this.udname,
        'email': this.udemail,
        'tag': this.udtag,
        'introduce': this.udintro
      }
      var me = this
      var config = {
        method: 'post',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service',
        url: 'http://localhost:8090/user/Updateuser',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: datare
      }
      axios(config)
        .then(function (response) {
          if (response.data.code === 1) {
            me.$message({
              message: response.data.msg,
              type: 'success'
            })
            me.usermessage.umsg = datare
          } else {
            me.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getbasicmessage: async function (account) {
      var userurl = 'http://localhost:8090/user/getinfo'
      var userpostdata = {
        'account': account,
        'token': localStorage.getItem('token')
      }
      var blogurl = 'http://localhost:8090/blog/getblog?name='
      var blogpostdata = ''
      var message = await this.$sendaxios('post', userurl, userpostdata)
      // this.usermessage = {
      //   'name': message.umsg.name,
      //   'portrait': message.umsg.portrait,
      //   'email': message.umsg.email,
      //   'intro': message.umsg.intro,
      //   'tag': message.umsg.tag
      // }
      this.usermessage = message.umsg
      blogurl = blogurl + message.umsg.name
      var blogmes = await this.$sendaxios('get', blogurl, blogpostdata)
      this.blogmessage = blogmes.result
      this.udtag = message.umsg.tag
      this.udintro = message.umsg.intro
      this.udemail = message.umsg.email
      this.udname = message.umsg.name
      this.squareUrl = message.umsg.portrait
      console.log(this.squareUrl)
    },
    Initeditor: function () {
      var me = this
      this.editor = new E(document.getElementById('editorarea'))
      this.editor.config.height = 300
      this.editor.config.zIndex = 1
      // var text1 = document.getElementById('text1')
      this.editor.config.onchange = function (html) {
      // 第二步，监控变化，同步更新到 textarea
        me.blogcontent = me.editor.txt.html()
      }
      // 菜单
      this.editor.config.menus = [
        'bold',
        'head',
        'link',
        'italic',
        'underline',
        'image',
        'code'
      ]
      this.editor.config.showLinkImg = false
      // 配置 server 接口地址
      this.editor.config.uploadImgServer = 'http://localhost:8090/picture/blog'
      this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
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
      this.editor.config.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf'
      ]
      // 字体
      this.editor.config.fontNames = [
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
      this.editor.create()
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
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 50%;
    color: #176add;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .betterhidden {
    width: 100px;
    height: 100px;
    background-image: url('../assets/logo.png');
    background-color: #fff;
    opacity: 0;
  }
  .inputimg {
    background: url('../assets/inputimage.png') ;
    display: inline-block;
    background-position: center center;
  }
</style>
