<template>
  <div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <tab-control
      :title="['新款', '流行', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tapTabControl"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :title="['新款', '流行', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import BackTop from "components/content/backtop/BackTop";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
// import { debounce } from "common/utils.js";
import { itemListenerMixin } from "common/mixin";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 活跃
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 刷新
    this.$refs.scroll.refresh();
  },
  // 不活跃
  deactivated() {
    // 记录离开时的位置
    this.saveY = this.$refs.scroll.getScrollY();

    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 图片加载完成的事件监听;
  },
  methods: {
    // 点击切换精选，流行等数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }

      this.$refs.tapTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    // 点击返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 显示隐藏返回顶部图标
    contentScroll(position) {
      this.isShowTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      // refresh重新刷新
      this.$refs.scroll.scroll.refresh();
    },
    // 获取高度
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 传入轮播数据
        this.banners = res.data.banner.list;
        // 传入下个数据
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 传入主数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 可以多次上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* top: 44px; */
}
.content {
  /* height: calc(100% - 93px);*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>