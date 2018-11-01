<template>
    <el-aside style="background-color:#3c3c3c;">
        <div class="aside-logo" @click="collapseMenu">
            <!-- <img src="../assets/logo.png" style="width:40px;height:40px;"> -->
            <span class="logo-p1">ETL</span><span class="logo-p2">Online</span>
        </div>
        <el-menu
        :default-active="defaultIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#3c3c3c"
        :router="useRouter"
        :collapse="isCollapse"
        text-color="#fff"
        active-text-color="#409EFF">
        <el-menu-item index="hello">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="casebatch">
            <i class="el-icon-setting"></i>
            <span slot="title">案件管理</span>
        </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
  export default {
    data(){
        return{
            useRouter:true,
            isCollapse:false,
            defaultIndex:"casebatch"
        }
    },
	mounted: function(){
        this.defaultIndex = this.$router.currentRoute.name;
	},   
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        // this.$router.push('/main/'+key);
        // console.log(key, keyPath);
      },
      collapseMenu(){
        //   this.isCollapse = !this.isCollapse;
      }
    }
  };
</script>

<style lang="less">
    .el-menu-vertical-demo{
        border-right:none;
    }
    .aside-logo{
        padding: 20px 0 20px 20px;
        font-size:24px;
        font-weight: bold;
        .logo-p1{
            color: #409EFF;
        }
        .logo-p2{
            color:#afafaf;
        }
    }
</style>
