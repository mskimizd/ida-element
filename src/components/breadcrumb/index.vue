<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.name" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.cname }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.cname }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)

      // console.log(matched);
      // console.log(matched);

      // const first = matched[0]
      // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      // }
      this.levelList = matched
    }
  }
}
</script>

<style lang="less">
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    color: #fff;
    font-weight:normal;
    &:hover{
      color: #fff;
    }
}  
.app-breadcrumb.el-breadcrumb .no-redirect {
    color: #eee;
}
</style>
