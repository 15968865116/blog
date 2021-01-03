<template>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1, initial-scale=1.0">
            <title>{{blogdata.Title}}</title>
        </head>
        <!-- 个人信息 -->
        <body class="spbg">
        <div style="width:100%;text-align:center" class="bgi">
          <div class="left" id="left">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="80" src="http://localhost:8090/blogimg/youneverknow1605097981.jpg"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                  <div class="left" id="left">
                    <div>
                      <el-avatar shape="square" :size="80" src="http://localhost:8090/blogimg/youneverknow1605097981.jpg"></el-avatar>
                      <!-- 这里打算做一个标签的for循环 !-->
                      <div style="display:block-inline">
                        {{userinfo.intro}}
                      </div>
                      <div style="display:block-inline">
                        <a v-for="item in tag" :key="item">
                          <el-tag>{{item}}</el-tag>
                        </a>
                      </div>
                      <div>
                        <span>{{userinfo.name}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{userinfo.email}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="mid" id="mid">
            <el-divider style="margin-top: 10px;margin-bottom: 10px;" content-position="left">我只是一条分割线</el-divider>
            <!-- 标题区域 -->
            <h1>{{blogdata.Title}}</h1><br>
            <!-- 时间线 -->
            <a style="font-size:13px"><font style="color:#909399">发布日期：{{blogdata.Pubdate}}</font></a><br>
            <a style="font-size:13px"><font style="color:#909399">最新更新：{{blogdata.Updatedate}}</font></a><br>
            <a style="font-size:13px"><font style="color:#909399">作者：{{blogdata.Puber}}</font></a><br><br><br>
            <!-- 具体内容 -->
            <div id="content">{{blogdata.Content}}</div>
            <el-divider style="margin-top: 10px;margin-bottom: 10px;" content-position="left"></el-divider>
            <p style="text-align:left">评论区</p><br>
            <div style="text-align:left" v-for="showcomment in showcomments" :key="showcomment.id">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{showcomment.commentname}}</span>
                  <div style="font-size:13px;text-align:right">
                    <font style="color:#909399">
                      {{showcomment.commenttime}}
                    </font>
                  </div>
                </div>
                <div >
                  {{showcomment.comments}}
                </div>
              </el-card><br>
            </div>
            <el-divider style="margin-top: 10px;margin-bottom: 10px;" content-position="left"></el-divider>
            <p style="text-align:left">发表评论</p>
            <div style="text-align:left">
              <el-input style="width:30%" v-model="commentname" placeholder="昵称"></el-input><br><br>
            </div>
            <div style="text-align:left">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="comment">
              </el-input><br><br>
            </div>
            <div style="">
              <el-button style="float:left" type="primary" @click="pubcomment">发表评论</el-button>
              <el-button style="float:right" type="primary" @click="back">返回首页</el-button>
            </div>
          </div>
        </div>
        </body>
    </html>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      bolgtitle: '',
      blogdataresult: '',
      blogdata: '',
      userinfo: {},
      commentname: '',
      comment: '',
      tag: {},
      showcomments: {}
    }
  },
  mounted () {
    this.getblogdata()
    // document.getElementById('mid').style.minHeight = String(window.innerHeight) + 'px'
    // document.getElementById('content').append(this.blogdata.Content)
  },
  methods: {
    getblogdata: async function () {
      var geturluser = 'http://localhost:8090/user/infosingle?name=Elephant'
      var usergmes = await this.$sendaxios('get', geturluser, '')
      this.userinfo = usergmes.umsg
      this.tag = this.userinfo.tag.split(';')
      var url = 'http://localhost:8090/blog/specificblog?id=' + this.$route.query.blog_id
      this.blogdataresult = await this.$sendaxios('get', url, '')
      this.blogdata = this.blogdataresult.result
      this.blogdata.Pubdate = this.timestampToTime(this.blogdata.Pubdate)
      this.blogdata.Updatedate = this.timestampToTime(this.blogdata.Updatedate)
      document.getElementById('content').innerHTML = String(this.blogdata.Content)
      var commenturl = 'http://localhost:8090/comment/commentchecked?blogid=' + this.$route.query.blog_id
      var commentdata = await this.$sendaxios('get', commenturl, '')
      this.showcomments = commentdata.result
      for (var i = 0; i < this.showcomments.length; i++) {
        this.showcomments[i].commenttime = this.timestampToTime(this.showcomments[i].commenttime)
      }
    },
    timestampToTime: function (timestamp) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    pubcomment: function () {
      var dataforcomment = {
        'commentname': this.commentname,
        'comments': this.comment,
        'blogid': parseInt(this.$route.query.blog_id)
      }
      var me = this
      var config = {
        method: 'post',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service',
        url: 'http://localhost:8090/comment/comment',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: dataforcomment
      }
      axios(config)
        .then(function (response) {
          if (response.data.code === 1) {
            me.$message({
              message: '评论成功' + '!' + response.data.result,
              type: 'success'
            })
          } else {
            me.$message.error(response.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
    },
    back: function () {
      this.$router.push({path: '/myblog', query: {name: 'elephant'}})
    }
  }
}
</script>
<style scoped>
.left {
    height: 100%;
    width: 100%;
    text-align: center;
}
.mid {
    margin-bottom: 10px;
    height: 100%;
    width: 70%;
    display: inline-block;
    text-align: center;
}
</style>
