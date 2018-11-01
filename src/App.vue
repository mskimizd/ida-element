<template>
  <div id="app">
    <!-- <transition name='el-zoom-in-center'>  -->
      <router-view></router-view> 
    <!--  </transition> -->
  </div>
</template>

<script>
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style lang="less">

#app {
  font-family: Helvetica, sans-serif; 
  height: 100vh;
  // height:100vh;
  // overflow: hidden;
  /* text-align: center; */
}

body{
  margin:0;
  padding:0;
}

.el-notification{
  border-radius: 0px;
}

.el-message{
  border-radius: 0px;  
}

</style>
