<template>
  <el-container direction="vertical" style="height: 100%;"> 
    <!-- <myAside></myAside> -->
    <myHeader></myHeader>
    
    <el-container>
      <el-main style="padding: 0px 40px;">
        <router-view></router-view> 
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import myAside from './aside.vue'
  import myHeader from './header.vue'

  export default {
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },  
    components: {
      'myAside':myAside,    
      'myHeader':myHeader
    },    
  };
</script>

<style>

</style>
