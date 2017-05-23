import axios from 'axios'
export default {
  state: {
    page: 1,
    data: [],
    newsDate: [],
    banners: [],
    newsTitle: [],
    loadBtn: false,
    loadAnimation: true,
    newsUrl: 'https://route.showapi.com/109-35?showapi_appid=34477&showapi_sign=cfa5957a730f43d38886bd16469b2a86&channelId=5572a108b3cdc86cf39001cd&needContent=0&needHtml=1&page='
  },
  mutations: {
      // mutations 修改数据
    loadNews (state) {
      let data = state.data
      console.log(state.data)
      if (data.length > 2) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].imageurls[0]) {
            state.newsDate.push(data[i])
          }
        }
        for (let i = 0; i < 4; i++) {
          if (state.banners.length < 4) {
            state.banners.push(state.newsDate[i].imageurls[0].url)
          }
        }
        // 数据请求成功显示加载更多按钮
      } else {
        state.loadAnimation = false
        console.log('没有更多数据了')
        return false
      }
      state.loadBtn = true
      state.loadAnimation = false
    }
  },
  actions: {
    // axios异步请求函数
    askNews ({commit, state}, url) {
      axios({
        method: 'get',
        url: url
      })
      .then((res) => {
        let data = res.data.showapi_res_body.pagebean.contentlist
        state.data = data
        console.log(1)
        // console.log(data)
        for (let i in data) {
          state.newsTitle.push(data[i].title)
          // console.log(data[i].title)
        }
        commit('loadNews')
      })
    }
  }
}
