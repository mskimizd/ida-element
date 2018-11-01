<template>
  <el-container style="height:100%">
    <!-- <el-aside style="height:100%;"> -->
    <me-aside></me-aside>
    <!-- </el-aside> -->
    <el-main>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
    </el-main>  
  </el-container>
</template>

<script>
  import aside from '~/components/aside.vue';

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
      'me-aside':aside
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


  

</style>