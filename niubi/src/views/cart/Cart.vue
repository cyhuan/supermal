<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{ cartLength }}）</div>
    </nav-bar>

    <!-- 列表 -->
    <cart-list />
    <!-- 汇总 -->
    <cart-buttom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./chilidComps/CartList";
import CartButtomBar from "./chilidComps/CartButtomBar";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>