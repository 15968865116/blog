<template>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=1, initial-scale=1.0">
      <title>首页</title>
  </head>
  <body class="indexbody">
    <div class="">
      <div>
        <canvas id="Canvas" class="canvasclass" style="z-index:1">您的浏览器不支持Canvas</canvas>
        <div class="bottommark" id="bottommark" @mousemove="beenchose('bottommark')" @mouseout="beenmove('bottommark')">
          <font id="font">
            解
          </font>
        </div>
      </div>
        <!-- <div class="bigmark" id="bigmark">
            <div class="centermark" id="centermark">
                <div ref="bookmark" v-for="bookmarks in bookmarkswihtstyle" :key="bookmarks['bookmark']"
                @mouseover="beenchose(bookmarks['bookmark'])" @mouseout="beenmove(bookmarks['bookmark'])"
                :id="bookmarks['bookmark']"
                :style="bookmarks['style']">
                </div>
            </div>
            <div class="bottommark"></div>
        </div>-->
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
      ],
      balllist: []
    }
  },
  mounted () {
    // 初始化画布
    let canvas = document.getElementById('Canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 5
    for (var i = 0; i < 200; i++) {
      var x = Math.random() * canvas.width
      var y = Math.random() * canvas.height
      var radius = Math.random() * 10
      var ball = new this.Ball(x, y, canvas.width / 2, canvas.height / 2, radius, 'white')
      this.balllist.push(ball)
    }
    this.animate()
    document.getElementById('bottommark').style.left = String(canvas.width / 2 - 40) + 'px'
    document.getElementById('bottommark').style.top = String(canvas.height / 2 - 40) + 'px'
    document.getElementById('bottommark').style.cursor = 'pointer'
    window.onresize = () => {
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 4
      document.getElementById('bottommark').style.left = String(canvas.width / 2 - 40) + 'px'
      document.getElementById('bottommark').style.top = String(canvas.height / 2 - 40) + 'px'
      document.getElementById('bottommark').style.fontSize = String(50) + 'px'
      document.getElementById('bottommark').style.cursor = 'pointer'
      this.balllist = []
      for (var i = 0; i < 200; i++) {
        var x = Math.random() * canvas.width
        var y = Math.random() * canvas.height
        var radius = Math.random() * 10
        var ball = new this.Ball(x, y, canvas.width / 2, canvas.height / 2, radius, 'white')
        this.balllist.push(ball)
      }
    }
  },
  methods: {
    // 初始化Canvas
    initCanvas: function () {
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 4
      // var ctx = canvas.getContext('2d')
      // for (var i = 0; i < 100; i++) {
      //   var x = 5 + Math.random() * (canvas.width - 10)
      //   var y = 5 + Math.random() * (canvas.height - 10)
      //   var radius = Math.random() * 10
      //   ctx.arc(x, y, radius, 0, Math.PI * 2, false)
      // }
    },
    // 创建ball对象
    Ball: function (x, y, destx, desty, radius, color) {
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 4
      this.sd = Math.random() * 2000
      var ctx = canvas.getContext('2d')
      this.x = x
      this.y = y
      this.destx = destx
      this.desty = desty
      this.dx = (this.destx - this.x) / this.sd
      this.dy = (this.desty - this.y) / this.sd
      this.radius = radius
      this.color = color
      this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
      }
      this.update = function () {
        if (((this.destx - 10) <= this.x) && (this.x <= this.destx + 10) && (this.desty - 10 <= this.y) && (this.y <= this.desty + 10)) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.dx = (this.destx - this.x) / this.sd
          this.dy = (this.desty - this.y) / this.sd
        } else {
          this.x = this.x + this.dx
          this.y = this.y + this.dy
        }
        this.draw()
      }
    },
    drawline: function (x, y, movetox, movetoy) {
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 4
      var ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(movetox, movetoy)
      ctx.stroke()
      ctx.closePath()
    },
    // loop
    animate: function () {
      requestAnimationFrame(this.animate)
      let canvas = document.getElementById('Canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 4
      var ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '48px Microsoft YaHei'
      ctx.fillText('封', canvas.width / 2 - 24, canvas.height / 2 + 16)
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2, false)
      ctx.stroke()
      ctx.closePath()
      ctx.lineWidth = 4
      ctx.setLineDash([5, 15])
      ctx.moveTo(canvas.width / 2 + 40, canvas.height / 2)
      ctx.lineTo(canvas.width / 2 + 240, canvas.height / 2)
      ctx.stroke()
      ctx.moveTo(canvas.width / 2 - 40, canvas.height / 2)
      ctx.lineTo(canvas.width / 2 - 240, canvas.height / 2)
      ctx.stroke()
      ctx.moveTo(canvas.width / 2 + 20, canvas.height / 2 - 20 * Math.sqrt(3))
      ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 - 100 * Math.sqrt(3))
      ctx.stroke()
      ctx.moveTo(canvas.width / 2 - 20, canvas.height / 2 - 20 * Math.sqrt(3))
      ctx.lineTo(canvas.width / 2 - 120, canvas.height / 2 - 100 * Math.sqrt(3))
      ctx.stroke()
      ctx.moveTo(canvas.width / 2 + 20, canvas.height / 2 + 20 * Math.sqrt(3))
      ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 + 100 * Math.sqrt(3))
      ctx.stroke()
      ctx.moveTo(canvas.width / 2 - 20, canvas.height / 2 + 20 * Math.sqrt(3))
      ctx.lineTo(canvas.width / 2 - 120, canvas.height / 2 + 100 * Math.sqrt(3))
      ctx.stroke()
      for (var i = 0; i < 200; i++) {
        this.balllist[i].update()
      }
    },
    // 当前块被选择时 会向上进行弹出
    beenchose: function (bookmark) {
      document.getElementById('bottommark').style.opacity = 1
      document.getElementById('font').style.color = 'purple'
    },
    // 离开当前块时会恢复成原来的样子
    beenmove: function (bookmark) {
      document.getElementById('bottommark').style.opacity = 0
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
      var style = 'width: 50px;height:200px;background-color: green;position: absolute;transition: top 3s;z-index:1;opacity:1;left:'
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
    * {
      margin:0;
      padding:0;
    }
    .indexbody{
      height: 100%;
      width: 100%;
      background: url('../assets/naliduo22.jpg') no-repeat;
      background-size: cover;
      position: absolute;
      overflow: hidden;
      opacity: 1;
      background-position: center 0;
    }
    .bigmark{
        width: 100%;
        height: 100%;
        margin: auto;
        position:relative;
    }
    .centermark{
        width: 500px;
        height: 400px;
        position: absolute;
        left:30%;
        top:10px;
        opacity: 1;
    }
    /* .canvasclass {
      background-image: url('../assets/naliduo22.jpg');
      background-repeat:no-repeat;
      background-size:100% 100%;
    } */
    .bottommark{
        width: 80px;
        height: 80px;
        background-size:100% 100%;
        float: left;
        left: 500px;
        top: 10px;
        z-index: 2;
        position: absolute;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 50px;
        text-align: center;
        transition: opacity 3s;
        opacity: 0;
        font-weight: bold;
    }
    .headerline{
      width: 100%;
      height: 50px;
      background-color:black;
    }
    html,body{
      height: 100%;
      width:100%;
    }
    .fullscree {
      height: 100%;
      width:100%;
    }
</style>
