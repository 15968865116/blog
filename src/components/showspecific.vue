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
              <div>
                <el-avatar shape="square" :size="80" src="http://localhost:8090/blogimg/youneverknow1605097981.jpg"></el-avatar>
                <!-- 这里打算做一个标签的for循环 !-->
                <div style="display:block-inline">
                  <el-tag>标签一</el-tag>
                  <el-tag>标签一</el-tag>
                  <el-tag>标签一</el-tag>
                </div>
                <div>
                  <span>{{userinfo.name}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span></span>
                  <el-divider direction="vertical"></el-divider>
                  <span></span>
                </div>
              </div>
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
            <p style="text-align:left">评论区</p>
          </div>
        </div>
        </body>
    </html>
</template>
<script>
export default {
  data: function () {
    return {
      bolgtitle: '',
      blogdataresult: '',
      blogdata: '',
      userinfo: ''
    }
  },
  mounted () {
    this.getblogdata()
    // document.getElementById('mid').style.minHeight = String(window.innerHeight) + 'px'
    // document.getElementById('content').append(this.blogdata.Content)
  },
  methods: {
    getblogdata: async function () {
      var geturluser = 'http://localhost:8090/user/getinfosingle?name=Elephant'
      var usergmes = await this.$sendaxios('get', geturluser, '')
      this.userinfo = usergmes
      var url = 'http://localhost:8090/blog/getspecificblog?id=' + this.$route.query.blog_id
      this.blogdataresult = await this.$sendaxios('get', url, '')
      console.log(this.blogdataresult)
      this.blogdata = this.blogdataresult.result
      this.blogdata.Pubdate = this.timestampToTime(this.blogdata.Pubdate)
      this.blogdata.Updatedate = this.timestampToTime(this.blogdata.Updatedate)
      document.getElementById('content').innerHTML = String(this.blogdata.Content)
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
