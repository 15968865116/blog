<template>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1, initial-scale=1.0">
            <title>我的主页</title>
        </head>
        <!-- 个人信息 -->
        <body>
            <div id="bodya" style="text-align:center;background:black">
                <!-- 这里打算做一个标签的for循环 !-->
                <div id="dh" style="position:absolute;">
                    <font style="color:blue">
                    {{userinfo.intro}}<br>
                    </font>
                    <a href="http://localhost:8080/#/myblog">My Blog</a><br>
                    <a href="">Where are you from?</a>
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
      tag: []
    }
  },
  mounted () {
    this.Initvalue()
    // document.getElementById('mid').style.minHeight = String(window.innerHeight) + 'px'
    var dd = document.getElementById('bodya')
    var dh = document.getElementById('dh')
    dd.style.height = String(window.innerHeight) + 'px'
    dh.style.top = String(window.innerHeight / 2) + 'px'
    console.log(window.innerHeight)
  },
  methods: {
    Initvalue: async function () {
      var geturluser = 'http://localhost:8090/user/getinfosingle?name=Elephant'
      var usergmes = await this.$sendaxios('get', geturluser, '')
      this.userinfo = usergmes.umsg
      this.tag = this.userinfo.tag.split(';')
    }
  }
}
</script>
<style scoped>
    a:link {
        color: blue;
    }
    a:visited {
        color: yellow
    }
    a{ TEXT-DECORATION:none }
</style>
