<template>
    <el-header>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="header-logo" >
                    <span class="logo-p1">ETL</span><span class="logo-p2">Online</span><span style="font-size: 14px;color: #888;">
                        <span v-if="headerSubTitle!=''" > / </span> {{ headerSubTitle }}
                    </span>
                </div>                
            </el-col>
            <el-col :span="6" :offset="12">
                <div class="header-avatar" >
                    <el-dropdown>
                        <span class="el-dropdown-link" style="display: flex;">
                            <img src="../assets/image/avatar.png" >
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item>个人信息</el-dropdown-item> -->
                            <el-dropdown-item>
                                <span @click="logout">退出系统</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div> 
            </el-col>
        </el-row>   
    </el-header>
</template>

<script>
  export default {
    data () {
        return {
            headerSubTitle:""
        }
    },      
    watch: {
        '$route': 'changeRoute'
    },
    created () {
        this.changeRoute();
    },          
    methods: {
      changeRoute () {
        let name = this.$route.name;
        switch(name){
            case 'casebatch':
                this.headerSubTitle = "案件管理";
                break;
            case 'protocol':
                this.headerSubTitle = "协议分析";
                break;
            default:
                this.headerSubTitle = "";
        }
      },
      logout() {
        this.$router.push('/login');
      }
    }      
  };
</script>

<style lang="less">
    .header-logo{
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
    .header-avatar{
        height: 68px;
        line-height: 68px;
        display: flex;
        justify-content: flex-end;
        align-items: center;   
        padding: 0 20px;    
        img{
            width:36px;
            height:36px;
            border-radius: 50%;
            border: 1px solid #ddd;
        }     
    }
</style>
