<template>
  <div>
    <app-header :showType="showType" @show-panel="onShowPanel"></app-header>
    <transition>

      <router-view :key="key" style="padding: 20px 10px;"></router-view>
    </transition>-->
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader';
import HeaderMenu from '@/components/layout/HeaderMenu';
export default {
  components: {AppHeader,HeaderMenu},
  data() {
    return {
      showType: ''
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date()
    }
  },
  methods: {
    onShowPanel(v) {
      this.showType = this.showType == v ? '' : v
    }
  }
}
</script>

<style lang="less" scoped>
</style>

