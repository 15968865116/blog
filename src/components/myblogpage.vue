<template>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1, initial-scale=1.0">
            <title>我的主页</title>
        </head>
        <body>
            <div style="width:100%;text-align:center;">
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
                    <div v-for="row in bloginfo.slice((currentpage-1)*10,currentpage*10)" :key="row.ID">
                        <div style="margin-top: 10px;margin-bottom: 10px;">
                           <el-link type="primary" style="font-size:18px" :href="'http://localhost:8080/#/spcific?blog_id='+row.ID">{{row.Title}}</el-link><br>
                            <a style="font-size:13px"><font style="color:#909399">发布日期：{{row.Pubdate}}</font></a>
                            <a style="font-size:13px"><font style="color:#909399">最新更新：{{row.Updatedate}}</font></a>
                            <a style="font-size:13px"><font style="color:#909399">作者：{{row.Puber}}</font></a>
                            <el-divider></el-divider>
                        </div>
                    </div>
                    <div class="block">
                        <el-pagination
                            :current-page="currentpage"
                            @current-change="handlecurrentchange"
                            layout="prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </body>
    </html>
</template>
<script>
export default {
  data: function () {
    return {
      userinfo: '',
      bloginfo: '',
      total: 0,
      currentpage: 1
    }
  },
  mounted () {
    this.Initvalue()
  },
  methods: {
    Initvalue: async function () {
      var geturluser = 'http://localhost:8090/user/getinfosingle?name=Elephant'
      var usergmes = await this.$sendaxios('get', geturluser, '')
      this.userinfo = usergmes
      var geturlblog = 'http://localhost:8090/blog/getblog?name=Elephant'
      var blogmes = await this.$sendaxios('get', geturlblog, '')
      this.bloginfo = blogmes.result
      for (var i = 0; i < this.bloginfo.length; i++) {
        this.bloginfo[i].Pubdate = this.timestampToTime(this.bloginfo[i].Pubdate)
        this.bloginfo[i].Updatedate = this.timestampToTime(this.bloginfo[i].Updatedate)
      }
      this.total = this.bloginfo.length
      console.log(this.userinfo)
      console.log(this.bloginfo)
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
    handlecurrentchange: function (val) {
      this.currentpage = val
    }
  }
}
</script>
<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
html,body {
    height: 100%;
    width: 100%;
}
.left {
    margin-top: 10px;
    height: 100%;
    width: 100%;
    background-color: white;
}
.mid {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 100%;
    width: 70%;
    display: inline-block;
    text-align: center;
}
.right {
    height: 100%;
    width: 28%;
    background-color: red;
    display: inline-block;
}
</style>
