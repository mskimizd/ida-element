<template>
    <div class="top-panel" >
        <el-tabs v-model="tabSelected" >
            <el-tab-pane label="高级搜索" name="advsearch">
                <div class="advsearch-panel" >
                    <div class="panel-item-line" >
                        <div class="line-item-label" ><span>检索关键词</span></div>
                        <el-input placeholder="请输入内容" v-model="keyword" ></el-input>
                    </div>                            
                    <div class="panel-item-line">
                        <div class="line-item-label" ><span>类型选择</span></div>                            
                        <div class="line-item" >
                            <el-checkbox-group v-model="typeSelected" @change="typeChange(typeSelected)">
                            <div class="checkbox-type" v-for="(type, key) in types" >
                                <el-checkbox border :label="key" :key="key">{{ type.name }}</el-checkbox>
                            </div>  
                            </el-checkbox-group>
                        </div> 
                        <div class="line-item" >
                            <div class="checkbox-all" v-for="(type, key) in types" >
                                <el-checkbox :indeterminate="type.isIndeterminate" v-model="type.checkAll" :disabled="!type.checked" @change="selectAllChange(type)">全选</el-checkbox>
                            </div>
                        </div>
                        <div class="line-item" >
                            <div class="checkbox-suffix" v-for="(type, key) in types" >
                                <el-checkbox-group v-model="type.checklist" :disabled="!type.checked" @change="suffixChange(type)">
                                    <el-checkbox v-for="(suffix, index) in type.suffix" :label="suffix" :key="suffix">{{ suffix }}</el-checkbox>
                                </el-checkbox-group>
                            </div> 
                        </div>                            
                    </div>
                    <div class="search-btn" >
                        <el-button type="primary" @click="searchAdv()" >搜索一下</el-button>
                        <el-button v-if="usage=='second'" type="danger" @click="searchAdvInResult()">在结果中搜索</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="邮件搜索" name="mailsearch">
                <div class="mailsearch-panel" >
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
                        <el-form-item label="附件名">
                            <el-input v-model="searchEmail.attachname"></el-input>
                        </el-form-item>
                        <el-form-item label="附件内容">
                            <el-input v-model="searchEmail.attachcontent"></el-input>
                        </el-form-item>                                                                      
                        <!-- <el-form-item label="检索附件">
                            <el-switch active-text="是" inactive-text="否" v-model="searchEmail.attachment"></el-switch>
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
                        </transition> -->
                        <el-form-item>
                            <el-button type="primary" @click="searchMail()">搜索一下</el-button>
                            <el-button v-if="usage=='second'" type="danger" @click="searchMailInResult()">在结果中搜索</el-button>
                        </el-form-item>                                                                
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="搜索设置" name="setting">
                <div class="search-setting" >
                    <!-- <el-form ref="searchSetting" :model="searchSetting" label-width="80px">
                        <el-form-item label="每页数据条数">
                            <el-input v-model="searchSetting.numPerPage"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" >保存</el-button>
                        </el-form-item>                                                                
                    </el-form> -->
                </div>    
            </el-tab-pane>
        </el-tabs>
        <div class="copright" v-if="usage!='second'" style="position: fixed;width: 100%;bottom: 60px;color:#666;font-size:14px;text-align: center;">
          © 2018 searchall
        </div>        
    </div>    
</template>

<script>

  import typesopt from '../config/filetype.js';

  import store from '../store/store.js';
  import moment from 'moment'
  import jQuery from 'jquery'
  import '../assets/js/md5/jquery.md5.js'  

  export default {
    data() {
        
        let tmp = {};
        for(let t in typesopt){
            tmp[t] = {};
            tmp[t].name = typesopt[t].name;
            tmp[t].suffix = typesopt[t].suffix;
            tmp[t].checklist = typesopt[t].suffix;
            tmp[t].checked=false;
            tmp[t].checkAll=true;
            tmp[t].isIndeterminate=false;
        }

        return {
            keyword:'',
            tabSelected:'advsearch',
            searchEmail: {
                sender:'',
                receiver:'',
                title:'',
                content:'',
                // attachment:false,
                attachname:'',
                attachcontent:''
            },
            searchSetting:{
                numPerPage:30
            },
            typeSelected:[],
            types: tmp     
        }
    },
    props: ['usage'],
    mounted(){
		this.init();
    },    
    methods: {
      init(){},
      typeChange(typeSelected){
        for(let t in this.types){
          typeSelected.indexOf(t)!=-1 ? this.types[t].checked = true : this.types[t].checked = false;
        }
      },
      selectAllChange(type){
        type.checkAll ? type.checklist = type.suffix : type.checklist = [];
        type.isIndeterminate = false;
      },
      suffixChange(type){
        let checkedCount = type.checklist.length;
        type.checkAll = checkedCount === type.suffix.length;
        type.isIndeterminate = checkedCount > 0 && checkedCount < type.suffix.length;
      },
      searchAdv(){
        // 验证高级搜索
        if(this.keyword == ""){
            this.$notify({
                title: '错误',
                message: '请输入搜索关键词',
                type: 'error',
                position: 'top-left'
            });            
            return;
        }

        let advSearchCond = [{
            type:"advanced",
            keyword:this.keyword,
            fileTypes:[]
        }];
        for(let ts in this.typeSelected){
            advSearchCond[0].fileTypes.push({
                key:this.typeSelected[ts],
                name:this.types[this.typeSelected[ts]].name,
                suffix:this.types[this.typeSelected[ts]].checklist
            });
        }
        let key = moment().format('X')+"@"+$.md5(JSON.stringify(advSearchCond));
        store.save(key, advSearchCond);

        // 清除
        this.keyword = "";
        this.typeSelected=[];
        for(let t in this.types){
            this.types[t].checklist = this.types[t].suffix;
            this.types[t].checked=false;
            this.types[t].checkAll=true;
            this.types[t].isIndeterminate=false;
        }

        this.$emit('close');
        this.$router.push('/result/'+key);
      },
      searchAdvInResult(){
        // 验证高级搜索
        if(this.keyword == ""){
            this.$notify({
                title: '错误',
                message: '请输入搜索关键词',
                type: 'error',
                position: 'top-left'
            });            
            return;
        }

          let searchCond = store.fetch(this.$router.currentRoute.params.storagekey);
          let advSearchCond = {
            type:"advanced",
            keyword:this.keyword,
            fileTypes:[]
          }
          for(let ts in this.typeSelected){
            advSearchCond.fileTypes.push({
                key:this.typeSelected[ts],
                name:this.types[this.typeSelected[ts]].name,
                suffix:this.types[this.typeSelected[ts]].checklist
            });
          }
          searchCond.push(advSearchCond);
          let key = moment().format('X')+"@"+$.md5(JSON.stringify(searchCond));
          store.save(key, searchCond);
          window.open("/#/result/"+key);
      },
      searchMail(){
        // 验证邮箱表单,至少填写一项
        let oneAtLeast = false;
        for(let key in this.searchEmail){
            if(this.searchEmail[key] != ""){
                oneAtLeast = true;
                break;
            }
        }
        // 错误提示
        if(!oneAtLeast){
            this.$notify({
                title: '错误',
                message: '请输入至少一个条件',
                type: 'error',
                position: 'top-left'
            });             
            return;
        }

        let mailSearchCond = [{
            type:"mail",
            keyword:this.searchEmail
        }];
        let key = moment().format('X')+"@"+$.md5(JSON.stringify(mailSearchCond));
        store.save(key, mailSearchCond);

        // 清除
        for(let key in this.searchEmail){
            this.searchEmail[key] = "";
        }

        this.$emit('close');
        this.$router.push('/result/'+key);        
      },
      searchMailInResult(){
        // 验证邮箱表单,至少填写一项
        let oneAtLeast = false;
        for(let key in this.searchEmail){
            if(this.searchEmail[key] != ""){
                oneAtLeast = true;
                break;
            }
        }
        // 错误提示
        if(!oneAtLeast){
            this.$notify({
                title: '错误',
                message: '请输入至少一个条件',
                type: 'error',
                position: 'top-left'
            });             
            return;
        }

        let searchCond = store.fetch(this.$router.currentRoute.params.storagekey);
        let mailSearchCond = {
            type:"mail",
            keyword:this.searchEmail
        }
        searchCond.push(mailSearchCond);
        let key = moment().format('X')+"@"+$.md5(JSON.stringify(mailSearchCond));
        store.save(key, searchCond);
        window.open("/#/result/"+key);        
      }    
    }
  }
</script>

<style lang="less">
    .top-panel{
        padding: 0px 60px 220px;
        text-align: left;
        input, .el-checkbox, .el-checkbox__inner, button{
            border-radius: 0;
        }
        .el-tabs__nav-wrap::after {
            height: 1px;
        }
        .el-tabs__nav{
            padding: 10px 0;
        }
        .el-tabs__item{
            color: #888;
        }      
        .el-tabs__item.is-active {
            color: #333;
            font-weight: bold;
        }
        .advsearch-panel{
            .panel-item-line{
                display:flex;
                .line-item-label{
                    width:100px;
                    height:46px;
                    line-height: 46px;
                    font-size: 14px;
                    color: #5a5e66;
                    text-align: right;
                    padding: 0 20px 0 0;
                    box-sizing: border-box;                                       
                }
                .line-item{
                    margin-right:20px;
                    .checkbox-type{
                        display:flex;
                        margin:10px 0;
                        .el-checkbox{
                            width:120px;
                        }
                    }
                    .checkbox-all{
                        margin:10px 0;
                        height:39px;
                        line-height: 39px;
                    }
                    .checkbox-suffix{
                        margin:10px 0;
                        height:39px;
                        line-height: 39px;
                        text-align: left;
                    }
                }
                .el-input{
                    width:480px;
                }                
            }
            .search-btn{
                padding-left:100px;
                margin-top:30px;
            }            
        }
        .mailsearch-panel{
            width: 480px;
            text-align: left;
            padding-left: 20px;
            .el-form-item__label{
                line-height: 40px;
                height: 40px;                
            }
        }        
    }
</style>