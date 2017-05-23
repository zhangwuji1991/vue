<template>
  <div class="select">
    
    <!--加载动画-->
    <div class="spinner" v-show='loadAnimation'></div>
    <section class="news">
      <div v-if='requestStatus'>
        <div class="d" v-for='(news,index) in newsDate'  @click="loadMoreBt(index)" ref="abc">
          <a href="javascript: void(0)" class="new" :key='news.channelId'>
            <img v-lazy='news.imageurls[0].url' :src="setNewSrc(news.imageurls[0].url)"/>
            <div class="intro">
              <h4>{{news.title}}</h4>
              <p><span>{{news.source}}</span> | <span>{{news.pubDate}}</span></p>
            </div>
          </a>
        </div>
        <button class="loadMore" @click='loadMoreBtn' v-show='loadBtn'>点击加载更多</button>
      </div>
      <div class="fail" v-else>~~~~(>_<)~~~~， 请求到数据失败!</div>
    </section>
  </div>
</template>

<script>
// 导入轮播图组件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// 导入vuex
// mapState :mapState 工具函数会将 store 中的 state 映射到局部计算属性中
// mapActions :工具函数会将 store 中的 dispatch 方法映射到组件的 methods 中。和 mapState、mapGetters 也类似，只不过它映射的地方不是计算属性，而是组件的 methods 对象上
import { mapState, mapActions } from 'vuex'
export default {
  name: 'select',
  data () {
    return {
      requestStatus: true,
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        onSlideChangeEnd: swiper => {
          // 这个位置放swiper的回调方法
          this.page = swiper.realIndex + 1
          this.index = swiper.realIndex
        }
      }
    }
  },
  // computed 计算属性
  computed: {
    ...mapState({
      page: state => state.se.page,
      newsUrl: state => state.se.newsUrl,
      banners: state => state.se.banners,
      newsDate: state => state.se.newsDate,
      loadBtn: state => state.se.loadBtn,
      loadAnimation: state => state.se.loadAnimation
    })
  },
  created: function () {
    this.askNews(this.newsUrl + this.page)
  },
  methods: {
    ...mapActions([
      'askNews'
    ]),
    setNewSrc (url) {  // 设置新闻图片
      return url
    },
    loadMoreBtn () { // 加载更多
      this.page++
      this.loadAnimation = true
      this.askNews(this.newsUrl + this.page)
    },
    loadMoreBt (index) { // 自定义函数
      // 获取到具体的新闻
      // console.log(this.newsDate[index].html)
     // alert(index)
      console.log(this.$refs.abc)
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus">
.select{
  background: #fff;
  .swiper-wrapper{
    height: 200px;
    .swiper-slide img{
      width: 100%;
      height: 200px;
    }
  }
  .news{
    min-height: 500px;
    padding: 0 10px;
    .new{
      height: 100px;
      color: #262627;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      img{
        height: 80px;
        width: 100px;
      }
      .intro{
        width: 80%;
        height: 80px;
        display: flex;
        padding-left: 10px;
        flex-direction: column;
        justify-content: space-between;
        h4{
          font-size: 20px;
          line-height: 1.2;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        p{
          font-size: 13px;
          color: #666;
        }
      }
    }
    .loadMore{
      height: 50px;
      width: 100%;
      color: #545454;
      background: #eee;
      text-align: center;
      line-height: 50px;
      font-size: 13px;
      border: none;
      border-radius: 0;
      outline: none;
      margin-bottom: 10px;
    }
    .fail{
      display: flex;
      min-height: 300px;
      align-items: center;
      justify-content: center;
    }
  }
}
/*加载动画*/
.spinner {
  position: fixed;
  left: 40%;
  bottom: 10%;
  width: 80px;
  height: 80px;
  margin: 50px auto;
  background-color: #69C61D
 
  border-radius: 100%; 
  -webkit-animation: scaleout 1.0s infinite ease-in-out;
  animation: scaleout 1.0s infinite ease-in-out;
}
 
@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
 
@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
</style>
