import axios from 'axios'

export default {
  url: 'http://localhost:9090',

  axiosRequest: function (api, method, data, form) {
    let that = this;
    let head;
    head = 'application/' + form + ';charset=UTF-8';
    let headers = {
      'Content-Type': head
    }
    return new Promise((resolve, reject) => {
      axios({
        url: that.url + api,
        headers: headers,
        method: method,
        params: data,
        data: data
      }).then(res => {
        resolve(res.data)
      }).catch(() => {
        reject('fail')
      })
    })
  },

  //json 形式提交
  axiosGetJson: function (api,data) {
    return this.axiosRequest(api,"GET",JSON.stringify(data),"json");
  },
  axiosPostJson:function (api,data) {
    return this.axiosRequest(api,"POST",JSON.stringify(data),"json");
  },
  axiosPutJson:function (api,data) {
    return this.axiosRequest(api,"PUT",JSON.stringify(data),"json");
  },
  axiosDeleteJson:function (api,data) {
    return this.axiosRequest(api,"DELETE",JSON.stringify(data),"json");
  },

  //form表单提交
  axiosGet: function (api,data) {
    return this.axiosRequest(api,"GET",data,"x-www-form-urlencoded");
  },
  axiosPost:function (api,data) {
    return this.axiosRequest(api,"POST",data,"x-www-form-urlencoded");
  },
  axiosPut:function (api,data) {
    return this.axiosRequest(api,"PUT",data,"x-www-form-urlencoded");
  },
  axiosDelete:function (api,data) {
    return this.axiosRequest(api,"DELETE",data,"x-www-form-urlencoded");
  }
}
