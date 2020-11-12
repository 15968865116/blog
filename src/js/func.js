// 登录时候的初始函数
async function getbasicmessage (account) {
  var userurl = 'http://localhost:8090/user/getinfo'
  var userpostdata = {
    'account': account,
    'token': localStorage.getItem('token')
  }
  var blogurl = 'http://localhost:8090/blog/getblog?name='
  var blogpostdata = ''
  this.usermessage = await sendaxios('post', userurl, userpostdata)
  blogurl = blogurl + this.usermessage.name
  var blogmes = await sendaxios('get', blogurl, blogpostdata)
  this.blogmessage = blogmes.result
}

// 传递
async function sendaxios (methods, url, data) {
  var axios = require('axios')
  var returndata
  var config = {
    method: methods,
    // url: 'http://175.24.28.202:8000/api/v1/subs_service',
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Host': 'http://175.24.28.202:80'
    },
    data: data
  }
  await axios(config).then(function (response) {
    returndata = response.data
  }).catch(function (error) {
    console.log(error)
  })
  return returndata
}

export {
  getbasicmessage,
  sendaxios
}
