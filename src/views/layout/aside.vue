<template>
  <el-scrollbar style="height:100%;width:200px;min-width:200px;">
  <div class="logo">
    <span class="image">
      <img src="../../assets/image/logo.png" />
    </span>
    <span style="letter-spacing: 2px;">数据分析</span>
  </div>
<el-menu style="height:100vh" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#304156"
text-color="#fff" active-text-color="#409eff" :collapse-transition="false" :collapse="isCollapse">
<sidebar-item v-for="route in routerData" :key="route.name" :item="route" :base-path="route.path" :dynamic-menus="dynamicMenus"
/>
</el-menu>
</el-scrollbar>
</template>

<script>
  import { RouterMap } from "~/router";
  import SidebarItem from "./sidebarItem";

  import Config from "~/config";

  export default {
    data() {
      return {
        routerData: RouterMap,
        isCollapse: false
      };
    },
    computed: {
      dynamicMenus () {
        return this.$store.state.comps
      }
    },    
    mounted: function () {
      // this.defaultIndex = this.$router.currentRoute.name;
      // console.log(this.routerData);
      this.$http.get(Config.backend+'/system/getComps').then(response => {
        response.json().then(res => {
          if (res.code == 200) {
            // console.log(res.data);
            var menus = [];
            for (var d of res.data) {
              if (parseInt(d.upSrcStatus) == 1) {
                menus.push(d);
              }
            }
            this.$store.commit('setx', menus);
          }
        })
      });

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

.logo{
  position: relative;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 60px;
    line-height: 60px;
    background: #425375;
    color: #fdfdfd;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    box-sizing: border-box;
    .image{
      position: relative;
      top:4px;
      margin-right: 10px;
    }
}
</style>