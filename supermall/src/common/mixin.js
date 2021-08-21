import { debounce } from './utils'

import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemListenerMixin: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListerner = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListerner);
  }
}

// export const backTopMixin = {
//   components: {
//     BackTop
//   },
//   data() {
//     return {
//       isShowTop: false,
//     }
//   },
//   methods: {
//     // 点击返回顶部
//     backClick() {
//       this.$refs.scroll.scrollTo(0, 0);
//     },
//   }
// }