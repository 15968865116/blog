<template>
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <div class="bigmark" id="bigmark">
      <canvas id="Canvas">您的浏览器不支持Canvas</canvas>
        <div class="centermark" id="centermark">
            <div ref="bookmark" v-for="bookmarks in bookmarkswihtstyle" :key="bookmarks['bookmark']"
            @mouseover="beenchose(bookmarks['bookmark'])" @mouseout="beenmove(bookmarks['bookmark'])"
            :id="bookmarks['bookmark']"
            :style="bookmarks['style']">
            </div>
        </div>
        <div class="bottommark"></div>
    </div>
</body>
</html>
</template>
<script>
export default {
  data () {
    return {
      bookmarkswihtstyle: [
        {
          'bookmark': '',
          'style': '',
          'title': ''
        }
      ]
    }
  },
  mounted () {
    // 初始化画布
    this.initCanvas()
    window.addEventListener('click', this.mousemove)
    // bookmark由服务器传输过来，大致包括标题、序号，需要转换成标题、序号加样式
    var bookmarks = [{'bookmark': '1', 'title': 'this is one'},
      {'bookmark': '2', 'title': 'this is one'},
      {'bookmark': '3', 'title': 'this is one'},
      {'bookmark': '4', 'title': 'this is one'},
      {'bookmark': '5', 'title': 'this is one'},
      {'bookmark': '6', 'title': 'this is one'},
      {'bookmark': '7', 'title': 'this is one'},
      {'bookmark': '8', 'title': 'this is one'},
      {'bookmark': '9', 'title': 'this is one'},
      {'bookmark': '10', 'title': 'this is one'}]
    var bookcount = bookmarks.length
    document.getElementById('centermark').style.left = String(window.innerWidth / 4) + 'px'
    document.getElementById('centermark').style.width = String(window.innerWidth / 2) + 'px'
    document.getElementById('bigmark').style.height = String(window.innerHeight) + 'px'
    this.bookmarkswihtstyle = this.thelocation(bookcount, window.innerWidth / 2, window.innerHeight / 4, window.innerWidth / 10, bookmarks)
    window.onresize = () => {
      this.initCanvas()
      document.getElementById('centermark').style.left = String(window.innerWidth / 4) + 'px'
      document.getElementById('centermark').style.width = String(window.innerWidth / 2) + 'px'
      document.getElementById('bigmark').style.height = String(window.innerHeight) + 'px'
      this.bookmarkswihtstyle = this.thelocation(bookcount, window.innerWidth / 2, window.innerHeight / 4, window.innerWidth / 10, bookmarks)
    }
  },
  methods: {
    // 初始化Canvas
    initCanvas: function () {
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth - 32
      canvas.height = window.innerHeight / 2
      var ctx = canvas.getContext('2d')
      for (var i = 0; i < 100; i++) {
        var x = 5 + Math.random() * (canvas.width - 10)
        var y = 5 + Math.random() * (canvas.height - 10)
        var radius = Math.random() * 10
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
      }
    },
    // loop
    animate: function () {
      requestAnimationFrame(this.animate)
    },
    // 鼠标移动事件
    mousemove: function () {
      console.log(event.screenX)
      console.log(event.screenY)
    },
    // 当前块被选择时 会向上进行弹出
    beenchose: function (bookmark) {
      document.getElementById(bookmark).style.background = 'red'
      var height = document.getElementById(bookmark).style.top.slice(0, -1)
      var newheiht = parseInt(height) - 50
      document.getElementById(bookmark).style.top = String(newheiht) + 'px'
      document.getElementById(bookmark).style.zIndex = 9999
      document.getElementById(bookmark).style.opacity = 1
    },
    // 离开当前块时会恢复成原来的样子
    beenmove: function (bookmark) {
      document.getElementById(bookmark).style.background = 'green'
      var height = document.getElementById(bookmark).style.top.slice(0, -1)
      var newheiht = parseInt(height) + 50
      document.getElementById(bookmark).style.top = String(newheiht) + 'px'
      document.getElementById(bookmark).style.zIndex = 1
      document.getElementById(bookmark).style.opacity = 0.4
    },
    // 输入一系列的bookmark 返回bookmark的style格式
    thelocation: function (alllenth, lablewidth, lableheight, blockwidth, bookmarks) {
      var countfir = 0
      var countsec = 0
      var countthir = 0
      var countfor = 0
      var bookmarkswihtstyle = []
      var averagewidthbreak = lablewidth / 4 / (alllenth / 4 + 1)
      var averageheightbreak = 60 / (alllenth / 4 + 1)
      var locationleft = 0
      var locationtop = 0
      var style = 'width: 50px;height:200px;background-color: green;position: absolute;transition: top 3s;z-index:1;opacity:0.4;left:'
      var newstyle = ''
      var onesample = {}
      for (var i = 0; i < bookmarks.length; i++) {
        switch (i % 4) {
          case 0:
            locationleft = lablewidth / 2 - blockwidth / 2 - countfir * averagewidthbreak
            locationtop = lableheight / 2 + 60 - countfir * averageheightbreak
            newstyle = style + String(locationleft) + 'px;top:' + String(locationtop) + 'px;'
            onesample = { 'bookmark': bookmarks[i]['bookmark'], 'style': newstyle, 'title': bookmarks[i]['title'] }
            bookmarkswihtstyle.push(onesample)
            countfir = countfir + 1
            break
          case 1:
            locationleft = lablewidth / 2 - blockwidth / 2 - countsec * averagewidthbreak + lablewidth / 4
            locationtop = lableheight / 2 + countsec * averageheightbreak
            newstyle = style + String(locationleft) + 'px;top:' + String(locationtop) + 'px;'
            onesample = { 'bookmark': bookmarks[i]['bookmark'], 'style': newstyle, 'title': bookmarks[i]['title'] }
            bookmarkswihtstyle.push(onesample)
            countsec = countsec + 1
            break
          case 2:
            locationleft = lablewidth / 2 - blockwidth / 2 + countthir * averagewidthbreak - lablewidth / 4
            locationtop = lableheight / 2 - countthir * averageheightbreak
            newstyle = style + String(locationleft) + 'px;top:' + String(locationtop) + 'px;'
            onesample = { 'bookmark': bookmarks[i]['bookmark'], 'style': newstyle, 'title': bookmarks[i]['title'] }
            bookmarkswihtstyle.push(onesample)
            countthir = countthir + 1
            break
          case 3:
            locationleft = lablewidth / 2 - blockwidth / 2 + countfor * averagewidthbreak
            locationtop = lableheight / 2 - 60 + countfor * averageheightbreak
            newstyle = style + String(locationleft) + 'px;top:' + String(locationtop) + 'px;'
            onesample = { 'bookmark': bookmarks[i]['bookmark'], 'style': newstyle, 'title': bookmarks[i]['title'] }
            bookmarkswihtstyle.push(onesample)
            countfor = countfor + 1
            break
        }
      }
      return bookmarkswihtstyle
    }
  }
}
</script>
<style>
    .bigmark{
        width: 100%;
        height: 100%;
        background-color: green;
        margin: auto;
        position:relative;
    }
    .centermark{
        width: 500px;
        height: 400px;
        background-color: yellow;
        position: absolute;
        left:30%;
        top:10px;
    }
    .bottommark{
        width: 50px;
        height: 200px;
        background-color: greenyellow;
        position: absolute;
        bottom: 0;
    }
    .headerline{
      width: 100%;
      height: 50px;
      background-color:black;
    }
</style>
