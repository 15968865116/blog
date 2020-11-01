<template>
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <div class="bigmark">
        <div class="centermark">
            <div ref="bookmark" v-for="bookmarks in bookmarkswihtstyle" :key="bookmarks['bookmark']"
            @mouseover="beenchose(bookmarks['bookmark'])" @mouseout="beenmove(bookmarks['bookmark'])"
            :id="bookmarks['bookmark']"
            :style="bookmarks['style']">
            <font size="6">我是一段文字</font>
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
    var blockwidth = 100
    var lablewidth = 500
    var lableheight = 400
    var bookcount = bookmarks.length
    this.bookmarkswihtstyle = this.thelocation(bookcount, lablewidth, lableheight, blockwidth, bookmarks)
    console.log(this.bookmarkswihtstyle)
  },
  methods: {
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
      var averagewidthbreak = 100 / (alllenth / 4 + 1)
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
            locationleft = lablewidth / 2 - blockwidth / 2 - countsec * averagewidthbreak + 100
            locationtop = lableheight / 2 + countsec * averageheightbreak
            newstyle = style + String(locationleft) + 'px;top:' + String(locationtop) + 'px;'
            onesample = { 'bookmark': bookmarks[i]['bookmark'], 'style': newstyle, 'title': bookmarks[i]['title'] }
            bookmarkswihtstyle.push(onesample)
            countsec = countsec + 1
            break
          case 2:
            locationleft = lablewidth / 2 - blockwidth / 2 + countthir * averagewidthbreak - 100
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
        width: 1200px;
        height: 800px;
        background-color: green;
        margin: auto;
        position:relative;
    }
    .centermark{
        width: 500px;
        height: 400px;
        background-color: yellow;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top:0;
    }
    .morecentermark{
        width: 50px;
        height: 200px;
        background-color: green;
        position: absolute;
        left: 50px;
        right: 0;
        bottom: 50px;
        top:0;
    }
    .centermarkleft{
        width: 50px;
        height: 200px;
        background-color: black;
        margin: auto;
        position: absolute;
    }
    .centermarkright{
        width: 50px;
        height: 200px;
        background-color: rgb(199, 25, 25);
        float: right;
        padding-right: 30px;
    }
    .bottommark{
        width: 50px;
        height: 200px;
        background-color: greenyellow;
        position: absolute;
        bottom: 0;
    }
</style>
