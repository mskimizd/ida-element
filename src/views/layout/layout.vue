<template>
  <el-container style="height:100%">
    <!-- <me-aside /> -->
    <!-- <el-aside> -->
      <me-aside />
    <!-- </el-aside>   -->
    <me-gadget />
    <el-container class="right-container">
      <el-header style="z-index:99">
       <me-header />
      </el-header>
      <el-main class="app-main">
        <keep-alive >
          <router-view />
        </keep-alive>        
      </el-main> 
    </el-container> 
  </el-container>
</template>

<script>
  import aside from './aside.vue';
  import gadget from './gadget.vue';
  import header from './header.vue';

  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      'me-aside':aside,
      'me-gadget':gadget,
      'me-header':header
    },    
  }
</script>

<style lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu--collapse {
    width: 64px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  } 

  .app-main{
    background: #f4f4f4;
  }

    

</style>