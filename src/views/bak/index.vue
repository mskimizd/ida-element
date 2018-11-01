<template>
  <div id="wrapper">  
    <div id="head">
      <!-- <bg></bg> -->
      <div class="head_wrapper">
        <div class="s_form">
          <div class="s_form_wrapper">
            <div class="lg">
              <span class="lg-main">
                SearchAll<span class="lg-sub" v-if="searchType!='所有'">{{ searchType }}</span>
              </span>
            </div>
            <div class="input-form-default" v-if="searchType!='邮件'">
              <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option :label="stopt" :value="stopt" v-for="stopt in searchTypeOptions"></el-option>
              </el-select> 
              <el-input placeholder="请输入内容" v-model="searchInput"></el-input>
              <el-button type="primary" @click="search()" >搜索一下</el-button> 
            </div>
            <div class="input-form-email" v-if="searchType=='邮件'">
              <el-form ref="searchEmail" :model="searchEmail" label-width="80px">
                <el-form-item label="发件人">
                  <el-input v-model="searchEmail.sender"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                  <el-input v-model="searchEmail.receiver"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                  <el-input v-model="searchEmail.title"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                  <el-input v-model="searchEmail.content"></el-input>
                </el-form-item>                                                
                <el-form-item label="检索附件">
                  <el-switch on-text="是" off-text="否" v-model="searchEmail.attachment"></el-switch>
                </el-form-item>
                <transition name="el-zoom-in-top">
                  <div v-show="searchEmail.attachment">
                    <el-form-item label="附件名">
                      <el-input v-model="searchEmail.attachname"></el-input>
                    </el-form-item>
                    <el-form-item label="附件内容">
                      <el-input v-model="searchEmail.attachcontent"></el-input>
                    </el-form-item>
                  </div>
                </transition>
                <el-form-item>
                  <el-button type="primary" @click="search()">搜索一下</el-button>
                  <el-button @click="searchType='所有'">返回</el-button>
                </el-form-item>                                                                
              </el-form>
            </div>            
            <div class="search-types">
              <!-- <el-radio-group v-model="searchType">
                <el-radio :label="stopt" :key="stopt" v-for="stopt in searchTypeOptions">{{ stopt }}</el-radio>
              </el-radio-group>               -->
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox :label="st" :key="st" v-for="st in searchTypes">{{ st }}</el-checkbox>
              </el-checkbox-group> -->
            </div>
          </div>          
        </div>
      </div>  
    </div>
  </div>  
</template>

<script>
  import bg from '../components/bg.vue';

  export default {
    data() {
      return {
        searchInput: '',
        searchEmail: {
          sender:'',
          receiver:'',
          title:'',
          content:'',
          attachment:false,
          attachname:'',
          attachcontent:''
        },        
        searchType:'所有',
        searchTypeOptions:[
          '所有',
          '邮件',          
          '文档',
          // '压缩',          
          // '网页',
          // '源码',
          // 'VHDL',
          // 'CCS Studio',
          // 'AUTOCAD',
          // '其他文件'
        ]    
      };
    },
    methods: {
      search() {
        this.$router.push('/result');
      }    
    },  
    components: {
      'bg':bg
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
    position: relative;
    padding-bottom: 0;
    height: 100%;
    min-height: 600px;
    text-align: center;    
  }

  .head_wrapper{
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
              color:#409EFF;
              // text-shadow: 2px 0 1px #505050;
              .lg-sub{
                color:#afafaf;
                font-size:14px;
                font-weight: normal;
              }
            }
          }
          .input-form-default{
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
            .el-select{
              right:-1px;
              .el-input__inner{
                border: 1px solid #d8dce5;
              }
            }          
          }
          .input-form-email{
            width:420px;
            margin-top: 15px;
            margin: 22px auto 0;
            text-align: left;
            input{
              border-radius: 0;
            }
            button{
              border-radius: 0;           
            }            
          }
          .search-types{
            width: 700px;
            margin: 20px auto 0 auto;
            .el-radio-group{
              text-align: left;
              .el-radio {
                margin: 0 30px 8px 0;
              }              
            }
          }          
        }
    }    
  }

  .el-select-dropdown{
    border-radius: 0px;
  }
</style>