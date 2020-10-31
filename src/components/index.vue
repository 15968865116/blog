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
            <div class="morecentermark"></div>
            <div class="centermarkright"></div>
            <div class="centermarkleft"></div>
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
      bookmark: [1, 2, 3, 4]
    }
  },
  mounted () {
    this.bookmark = [1, 2, 3, 4]
    var lablelength = 500
    var bookcount = this.bookmark.length
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
