<template>
    <el-scrollbar style="height:100%">
        <el-menu style="height:100vh" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#304156" text-color="#fff" active-text-color="#409eff" :collapse-transition="false" :collapse="isCollapse">
            <sidebar-item v-for="route in routerData" :key="route.name" :item="route" :base-path="route.path" />
        </el-menu>
    </el-scrollbar>
</template>

<script>
import { RouterMap } from "~/router";
import SidebarItem from "./sidebarItem";

export default {
  data() {
    return {
      routerData: RouterMap,
      isCollapse: false
    };
  },
  mounted: function() {
    // this.defaultIndex = this.$router.currentRoute.name;
    // console.log(this.routerData);
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  components: {
    "sidebar-item": SidebarItem
  }
};
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.el-menu--collapse {
  width: 64px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
