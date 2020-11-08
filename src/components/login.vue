<template>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1, initial-scale=1.0">
            <title>管理员登录</title>
        </head>
        <body class="loginbg">
            <div class="loginbg2" id="body">
            </div>
            <div class="loginform" id='loginform'>
                <p><font>管理员登录</font></p>
                <br>
                <el-input placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="user"
                :style="{'width':inputwidth}"
                >
                </el-input><p></p><br>
                <el-input placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="passwd"
                show-password>
                </el-input><p></p><br>
                <el-button type="primary" class="loginbutton">登录</el-button>
            </div>
        </body>
    </html>
</template>
<script>
export default {
  data () {
    return {
      user: '',
      passwd: '',
      inputwidth: ''
    }
  },
  mounted () {
    document.getElementById('loginform').style.width = String(window.innerWidth / 2) + 'px'
    document.getElementById('loginform').style.height = String(window.innerHeight / 3) + 'px'
    document.getElementById('loginform').style.top = String(window.innerHeight / 2 - window.innerHeight / 6) + 'px'
    document.getElementById('loginform').style.left = String(window.innerWidth / 2 - window.innerWidth / 4) + 'px'
    this.inputwidth = window.innerWidth / 6
    window.onresize = () => {
      document.getElementById('loginform').style.width = String(window.innerWidth / 2) + 'px'
      document.getElementById('loginform').style.height = String(window.innerHeight / 2) + 'px'
      document.getElementById('loginform').style.top = String(window.innerHeight / 2 - window.innerHeight / 6) + 'px'
      document.getElementById('loginform').style.left = String(window.innerWidth / 2 - window.innerWidth / 4) + 'px'
    }
  }
}
</script>
<style scoped>
*{
    margin:0px;
    padding:0px;
}
.loginbg{
    height: 100%;
    width: 100%;
    background: url('../assets/loginbg2.jpg') no-repeat;
    background-size: cover;
    position: absolute;
    overflow: hidden;
    opacity: 0.7;
    background-position: center 0;
    }
.loginform{
    float: left;
    position: absolute;
    width: 30%;
    left:45%;
    top:40%;
    height: 35%;
    text-align:center;
    opacity: 1;
}
.loginbg2{
    background-color: #fff;
    height: 100%;
    width: 100%;
    opacity: 0.2;
}
.el-input{
    width: 100%;
}
.loginbutton {
    width: 20%;
    height: 30px;
}
</style>
