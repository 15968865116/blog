<template>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1, initial-scale=1.0">
            <title>我的主页</title>
        </head>
        <body class="blogbg">
            <div style="width:100%;text-align:center;" class="bgi">
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
                <div class="mid" id="mid">
                  <el-divider style="margin-top: 10px;margin-bottom: 10px;" content-position="left">我只是一条分割线</el-divider>
                    <div v-for="row in bloginfo.slice((currentpage-1)*5,currentpage*5)" :key="row.ID">
                        <div style="">
                           <el-link type="primary" style="font-size:18px" :href="'http://localhost:8080/#/spcific?blog_id='+row.ID">{{row.Title}}</el-link><br>
                            <a style="font-size:13px"><font style="color:#909399">发布日期：{{row.Pubdate}}</font></a>
                            <a style="font-size:13px"><font style="color:#909399">最新更新：{{row.Updatedate}}</font></a>
                            <a style="font-size:13px"><font style="color:#909399">作者：{{row.Puber}}</font></a>
                            <el-divider></el-divider>
                        </div>
                    </div>
                    <div class="block">
                        <el-pagination
                            :page-size="5"
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
      userinfo: {},
      bloginfo: '',
      tag: [],
      total: 0,
      currentpage: 1
    }
  },
  mounted () {
    this.Initvalue()
    document.getElementById('mid').style.minHeight = String(window.innerHeight) + 'px'
    var bh = document.body.style.height
    // document.body.style.height = String(window.innerHeight) + 'px'
    console.log(bh)
  },
  methods: {
    Initvalue: async function () {
      var geturluser = 'http://localhost:8090/user/getinfosingle?name=Elephant'
      var usergmes = await this.$sendaxios('get', geturluser, '')
      this.userinfo = usergmes.umsg
      console.log(this.userinfo)
      this.tag = this.userinfo.tag.split(';')
      console.log(this.tag)
      var geturlblog = 'http://localhost:8090/blog/getblog?name=Elephant'
      var blogmes = await this.$sendaxios('get', geturlblog, '')
      this.bloginfo = blogmes.result
      for (var i = 0; i < this.bloginfo.length; i++) {
        this.bloginfo[i].Pubdate = this.timestampToTime(this.bloginfo[i].Pubdate)
        this.bloginfo[i].Updatedate = this.timestampToTime(this.bloginfo[i].Updatedate)
      }
      this.total = this.bloginfo.length
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
html,body {
    height: 100%;
    width: 100%;
}
.left {
    height: 100%;
    width: 100%;
}
.mid {
    height: 100%;
    width: 70%;
    display: inline-block;
    text-align: center;
}
/* .bgi {
  background: url('../assets/myblogbg.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  opacity: 0.7;
} */
</style>
