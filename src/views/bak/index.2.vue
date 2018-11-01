<template>
  <div id="wrapper" class="index-page"> 
    <div id="head">
      <ul>
          <li @click="topPanelVisible = true">
              <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                <i class="el-icon el-icon-menu"></i>
              </button>
          </li>
      </ul>
    </div>
    <div id="body">
      <!-- <bg></bg> -->
      <!-- <el-collapse-transition>
        <top-panel></top-panel>
      </el-collapse-transition>       -->
      <div class="body_wrapper">
        <div class="s_form">
          <div class="s_form_wrapper">
            <div class="lg">
              <a href="/" style="text-decoration: none;">
                <span class="lg-main">
                  Search<span class="lg-sub">All</span>
                </span>
              </a>
            </div>
            <div class="input-form" >
              <el-input placeholder="请输入内容" v-model="input"></el-input>
              <el-button type="primary" @click="search()" >搜索一下</el-button> 
            </div>
          </div>          
        </div>
        <div class="copright" style="position: fixed;width: 100%;bottom: 60px;color:#666;font-size:14px;">
          © 2018 searchall
        </div>  
      </div>        
    </div>
    <el-dialog title="" :visible.sync="topPanelVisible" fullscreen>
      <top-panel ></top-panel>
    </el-dialog>    
  </div>  
</template>

<script>
  import bg from '../components/bg.vue';
  import toppanel from '../components/toppanel.vue';
  import store from '../store/store.js'
  import moment from 'moment'

  import jQuery from 'jquery'
  import '../assets/js/md5/jquery.md5.js'
  
  export default {
    data() {
      return {
        input: '',
        topPanelVisible:false 
      };
    },
    methods: {
      search() {
        // 验证搜索
        if(this.input == ""){
            this.$message({
              message: '请输入搜索关键词',
              showClose: true,
              type: 'error'
            });
            return;
        }        
        let searchCond = [{
          type:"default",
          keyword:this.input
        }];
        let key = moment().format('X')+"@"+$.md5(JSON.stringify(searchCond));
        store.save(key, searchCond);
        // window.open("http://127.0.0.1:8010/#/result/"+key);
        this.$router.push('/result/'+key);
      }        
    },  
    components: {
      'bg':bg,
      'top-panel':toppanel
    }, 
  }
</script>

<style lang="less">

  #wrapper{
      position: relative;
      min-width: 810px;
      height: 100%;
      min-height: 600px;  
  }

  #head{
      padding: 0;
      margin: 0;
      width: 100%;
      height: 60px;
      line-height: 60px;
      z-index: 301;
      position: fixed;
      ul{
          list-style: none;
          display: flex;
          justify-content: flex-end;
          margin: 0;
          padding: 0 16px; 
          li{
              width:40px;
              text-align:right;
              padding-top: 8px;
              cursor:pointer;
              button{
                i{
                    font-size:32px;
                    color: #878d99;                    
                }
                &:hover{
                  i{
                    color: #409EFF;
                  }
                } 
              }         
          }                       
      }      
  }  

  #body{
    position: relative;
    padding-bottom: 0;
    height: 100%;
    min-height: 600px;
    text-align: center;    
  }

  .body_wrapper{
    height: 100%;
    .s_form {
        position: relative;
        top: 38.2%;
        .s_form_wrapper{
          position: relative;
          top: -80px;
          .lg{
            font-size:38px;
            font-weight: bold;
            padding:10px;
            .lg-main{
              color:#afafaf;
              // text-shadow: 2px 0 1px #505050;
              .lg-sub{
                color:#409EFF;
              }
            }
          }
          .input-form{
            margin-top: 15px;
            margin: 22px auto 0;
            width: 641px;
            text-align: left;
            z-index: 100;
            display: flex; 
            button{
              border-radius: 0;
              color: #fff;              
            }
            input{
              border-radius: 0;
            }           
          }          
        }
    }    
  }

  .index-page{
    .el-icon-close{
      font-size:32px;
    }
    .el-dialog__body {
      padding-top: 0px;
      .el-checkbox__label, label{
        line-height: 19px;
      }              
    }
  }


</style>