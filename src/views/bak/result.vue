<template>
    <div id="wrapper"> 
        <div id="head_x">
            <div class="head_wrapper_x">
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
                        <el-button type="primary" @click="search()">搜索一下</el-button>
                        <el-button type="danger" @click="searchInResult()">在结果中搜索</el-button>
                    </div>
                    <div class="tools" @click="topPanelVisible = true">
                        <ul>
                            <li>
                                <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                                    <i class="el-icon el-icon-menu"></i>
                                </button>
                            </li>
                            <!-- <li>
                                <i class="el-icon-fa el-icon-fa-user"></i>
                            </li>                                  -->
                        </ul>
                    </div>    
                </div>          
                </div>
            </div>  
        </div>
        
        <el-collapse-transition>
            <div v-show="topPanelVisible" style="position: fixed;z-index: 302;background: #fff;width: 100%;border-bottom: 1px solid #eee;padding: 30px 20px;box-sizing: border-box;">
                <button @click="topPanelVisible = false" type="button" aria-label="Close" class="el-dialog__headerbtn"><i style="font-size:32px;" class="el-dialog__close el-icon el-icon-close"></i></button>                
                <top-panel usage="second" v-on:close="topPanelVisible = false"></top-panel>
            </div>
        </el-collapse-transition>
       
        <div class="result-switch">
            <el-tabs v-model="filetype" @tab-click="">
                <el-tab-pane label="所有" name="all">所有</el-tab-pane>
                <el-tab-pane v-for="(type, index) in types" :label="type.name" :name="type.value">{{ type.name }}</el-tab-pane>
            </el-tabs>            
        </div>
        <div class="result-info">
            <span>为您找到相关结果约100,000,000个</span>
        </div>
        <div class="result-container" style="display: flex;">
            <div style="width:800px;">
                <div v-for="data in resultData" class="result-block">
                    <div class="result-filename">
                        <span>{{ data.filename }}</span>
                    </div>
                    <div class="result-content">
                        <span v-html="data.content"></span>
                    </div> 
                    <div class="result-location">
                        <span style="cursor:pointer;" 
                            v-clipboard:copy="data.location"
                            v-clipboard:success="onLocationCopy"
                            v-clipboard:error="onLocationCopyError"
                        >{{ data.location }}</span>
                        <span class="location-copy">
                            <i style="color: #409eff;" @click="downloadFile(data.location)" class="el-icon-fa el-icon-fa-download" ></i>
                        </span>
                    </div>
                    <div class="result-date">
                        <span>{{ data.date }}</span>
                    </div>                                                    
                </div>
                <!-- 重复 用于测试滚动 -->
                <!-- <div v-for="data in resultData" class="result-block">
                    <div class="result-filename">
                        <span>{{ data.filename }}</span>
                    </div>
                    <div class="result-content">
                        <span v-html="data.content"></span>
                    </div> 
                    <div class="result-location">
                        <span>{{ data.location }}</span>
                    </div>
                    <div class="result-date">
                        <span>{{ data.date }}</span>
                    </div>                                                    
                </div> -->
            </div>
            <div class="search-history-block" >
                <div class="search-history-con" >
                    <div v-for="(scon, index) in searchCond" :class="scon.type">
                        <div>
                            <span class="search-history-number" v-bind:class="{ 'current-search': index==searchCond.length-1, }">{{ index + 1 }}</span>   
                            <span v-if="scon.type!='mail'" class="search-history-content">{{ scon.keyword }}</span>
                            <span v-if="scon.type=='mail'" class="search-history-content">
                                <span>邮件文件</span>
                            </span>
                        </div>
                        <div v-if="scon.type=='advanced'" style="padding-left: 55px;font-size: 12px;width: 250px;color: #666;">
                            <span v-for="(ft, index) in scon.fileTypes" style="margin-right:10px;">
                                <span>{{ ft.name }}</span>
                                (<span v-for="(suffix, index) in ft.suffix">.{{ suffix }}</span>)
                            </span>    
                        </div>
                        <div v-if="scon.type=='mail'" style="padding-left: 55px;font-size: 12px;width: 250px;color: #666;">
                            <span v-for="(value, key) in scon.keyword" v-if="value!=''">
                                {{ key }} : {{ value }} ;
                            </span>
                        </div>
                    </div>
                </div>                     
            </div>                
        </div>
        <div class="pagination-container">
            <el-pagination
                @current-change="pageChange"
                :current-page="curPage"
                layout="prev, pager, next"
                prev-text="<上一页"
                next-text="下一页>"
                :total="500">
            </el-pagination>            
        </div>
        <div class="result-footer">
            <span>帮助</span>
        </div>            
    </div>  
</template>

<script>

  import toppanel from '../components/toppanel.vue';
  import typesopt from '../config/filetype.js';
  import config from '../config/config.js';  

  import store from '../store/store.js';
  import moment from 'moment'
  import jQuery from 'jquery'
  import '../assets/js/md5/jquery.md5.js'

  export default {
    data() {

        let tmp = [];
        for(let t in typesopt){
            tmp.push({
                name:typesopt[t].name,
                value:t
            });
        }

      return {
        curPage:1,
        filetype: 'all',
        topPanelVisible: false,
        types:tmp,
        input:'',
        searchCond:store.fetch(this.$router.currentRoute.params.storagekey),
        resultData:[
            {
                filename:"test.js",
                content:'...MT("line_comment", "[comment // <span class="keyword">Hello</span> world]"); // Alignment tests MT("align_port_map_style1", /** * mod mod(.a(a), * .b(b) * ); */ "[variable mod] [variable mod][bracket (].[variable a]...',
                location:'D:\workspace\Voxer\WebContent\vendor\codemirror\mode\verilog\test.js',
                date:'2017-9-1 14:03',
                type:'js',
            },
            {
                filename:"test.js",
                content:'...or", "[tag %h1][attribute .<span class="keyword">Hello</span>] Hey There"); MT("docType", "[tag !!! XML]"); MT("comment", "[comment / <span class="keyword">Hello</span> WORLD]"); MT("notComment", "[tag %h1] This is not a / comment "); MT("attributes", "[tag %a]...',
                location:'D:\workspace\Voxer\WebContent\vendor\codemirror\mode\haml\test.js',
                date:'2017-9-1 14:03',
                type:'js',
            },
            {
                filename:"test.js",
                content:'...tor", "[qualifier .foo-bar_<span class="keyword">Hello</span>] { }"); MT("idSelector", "[builtin #foo] { [error #foo] }"); MT("tagSelectorUnclosed", "[tag foo] { [property margin]: [number 0] } [tag bar] { }"); MT("tagStringNoQuotes", "[tag...',
                location:'D:\workspace\Voxer\WebContent\vendor\codemirror\mode\css\test.js',
                date:'2017-9-1 14:03',
                type:'js',
            },
            {
                filename:"CodeMirror: LESS mode",
                content:'... blue } /* first rule */ span[<span class="keyword">Hello</span>="Ocean"][goodbye="Land"] E[foo]{ padding:65px; } input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button { -webkit-appearance: none; // Inner-padding is...',
                location:'D:\workspace\Voxer\WebContent\vendor\codemirror\mode\css\less.html',
                date:'2017-9-1 14:03',
                type:'html',
            },
            {
                filename:"scss_test.js",
                content:'... MT("selector", "[builtin #<span class="keyword">Hello</span>][qualifier .world]{}"); MT("singleline_comment", "[comment // this is a comment]"); MT("multiline_comment", "[comment /*foobar*/]"); MT("attribute_with_hyphen", "[tag foo] { [proper...',
                location:'D:\workspace\Voxer\WebContent\vendor\codemirror\mode\css\scss_test.js',
                date:'2017-9-1 14:03',
                type:'js',
            },
            {
                filename:"controlRightSidebar.html",
                content:"... {:lang('<span class='keyword'>Hello</span>')}!{:lang('please')}{:lang('login')}{:lang('register')} {:lang('<span class='keyword'>Hello</span>')}! {:...",
                location:'C:/Users/Tom/Desktop/theflow/20171104download/theflow/template/shop/blue/controlRightSidebar.html',
                date:'2017-8-21 9:49',
                type:'html',
            },
            {
                filename:"controlRightSidebar.html",
                content:"... {:lang('<span class='keyword'>Hello</span>')}!{:lang('please')}{:lang('login')} | {:lang('register')} {:lang('<span class='keyword'>Hello</span>')}! {:...",
                location:'C:\Users\Tom\Desktop\theflow\Theflow20171006\theflow\template\shop\blue\controlRightSidebar.html',
                date:'2017-8-21 9:49',
                type:'html',
            },
            {
                filename:"leaflet-src.js",
                content:"...a template string of the form `'<span class='keyword'>Hello</span> {a}, {b}'` // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string // `('<span class='keyword'>Hello</span> foo, bar')`. You can also specify functions instead of strings for // data values 钬?they will be eva...",
                location:'D:\$RECYCLE.BIN\S-1-5-21-2748820898-4015887419-2030963319-1000\$R07Q15U\app\vendor\leaflet.1.2.0\leaflet-src.js',
                date:'2017-8-8 13:51',
                type:'js',
            },
            {
                filename:"searchCtrl.js",
                content:"...s = c_icons; // $log.log('<span class='keyword'>Hello</span>'); // $log.info('<span class='keyword'>Hello</span>'); // $log.warn('<span class='keyword'>Hello</span>'); // $log.error('<span class='keyword'>Hello</span>'); // $log.debug('<span class='keyword'>Hello</span>'); $scope.loaded = true; $scope.resultShow = false; $scope.pageStatus = 'init'; $sco...",
                location:'C:\Users\Tom\Desktop\webapps\Vr\js\controllers\searchCtrl.js',
                date:'2017-6-22 14:04',
                type:'js',
            },
            {
                filename:"sactionCtrl.js",
                content:"...cope.$broadcast('myupdateData','<span class='keyword'>Hello</span>'); event.stopPropagation(); angular.element('.slideinpage').addClass('slideIn'); } // 鍒囨崲铡熷鏁版嵁 $scope.toggleArray = [false,false,false,false,false,false,f...",
                location:'C:\Users\Tom\Desktop\webapps\Vr\js\controllers\sactionCtrl.js',
                date:'2017-3-17 12:44',
                type:'js',
            },           
        ]
      };
    },
    mounted:function(){
        this.fetchData(1);
        this.curPage = 1;
    },
    watch:{
        '$route':function(){
            this.fetchData(1);
            this.curPage = 1;
        }
    },
    methods: {
        onLocationCopy: function (e) {
            this.$notify({
                title: '成功',
                message: '成功复制文件路径到剪贴板',
                type: 'success'
            });
        },
        onLocationCopyError: function (e) {
            this.$notify({
                title: '警告',
                message: '复制文件路径失败，请手动复制',
                type: 'warning'
            });            
        },
        search:function(){
            // 验证搜索
            if(this.input == ""){
                this.$notify({
                    title: '错误',
                    message: '请输入搜索关键词',
                    type: 'error',
                    // position: 'top-left'
                });
                return;
            }            
            let searchCond = [{
                type:"default",
                keyword:this.input
            }];
            let key = moment().format('X')+"@"+$.md5(JSON.stringify(searchCond));
            store.save(key, searchCond);
            this.$router.push('/result/'+key);
        },
        searchInResult:function(){
            // 验证搜索
            if(this.input == ""){
                this.$notify({
                    title: '错误',
                    message: '请输入搜索关键词',
                    type: 'error',
                    // position: 'top-left'
                });
                return;
            }             
            let searchCond = store.fetch(this.$router.currentRoute.params.storagekey);
            searchCond.push({
                type:"default",
                keyword:this.input
            });
            let key = moment().format('X')+"@"+$.md5(JSON.stringify(searchCond));
            store.save(key, searchCond);
            window.open("/#/result/"+key);
        },
        pageChange(page){
            this.fetchData(page);
            this.curPage = page;
        },
        fetchData:function(curPage){
            this.searchCond = store.fetch(this.$router.currentRoute.params.storagekey);
            this.$http.post(config.backend_path+'/search',{
                query:this.searchCond,
                page:curPage,
            }).then(response => {
                response.json().then(res=>{
                    this.resultData = res.data;
                })
            }, response => {
                this.$notify.error({
                    title: '错误',
                    message: '服务器错误'
                });
            });            
        },
        downloadFile(path){
            alert(path);
        }      
    },  
    components: {
      'top-panel':toppanel
    }
  }
</script>

<style lang="less">
 
    #head_x{
        padding: 0;
        margin: 0;
        width: 100%;
        z-index: 301;
        min-width: 1000px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
        position: fixed; 
    }

    .head_wrapper_x{
        .s_form {
            zoom: 1;
            height: 60px;
            padding: 0 0 0 10px;
            .s_form_wrapper{
                display: flex;
                align-items: center;
                position:relative;
                height: 60px;
                .lg{
                    // margin: 7px 0 0;
                    font-size:24px;
                    font-weight: bold;
                    .lg-main{
                        color:#afafaf;
                        // text-shadow: 2px 0 1px #505050;
                        .lg-sub{
                            color:#409EFF;
                        }
                    }                                
                }
                .input-form{
                    margin: 0px 0 0 10px;
                    width: 641px;
                    text-align: left;
                    z-index: 100; 
                    display: flex;
                    button{
                        border-radius: 0;
                        color: #fff;              
                    }
                    .el-button+.el-button {
                        margin-left: 4px;
                    }                                        
                    input{
                        border-radius: 0;
                    }                                    
                }
                .tools{
                    // position:absolute;
                    // right:20px;
                    ul{
                        list-style: none;
                        display: flex;
                        margin: 0;
                        padding: 0; 
                        li{
                            width:40px;
                            text-align:right;
                            cursor:pointer;
                        }                       
                    }
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
    }

    .result-switch{
        padding-top:60px;
        padding-left:140px;
        background-color:#f8f8f8;
        .el-tabs__content{
            display: none;
        }
        .el-tabs__nav-wrap{
            &:after{
                background:transparent;
            }
        }
        .el-tabs__item {
            color: #666;
        }        
    }

    .result-info{
        margin: 0 0 0 136px;       
        span{
            font-size: 12px;
            color: #999;
        }
    }

    .result-container{
        margin: 16px 0 0 136px;   
        .result-block{
            margin:16px 0;
            .result-filename{
                font-size: 16px;
                text-decoration: underline;
                padding:4px;
                color: #0000cc;
                cursor:pointer;
            }
            .result-content{
                padding:2px;
                font-size: 13px;
                .keyword{
                    font-style: normal;
                    color: #c00;                    
                }
            }
            .result-location{
                padding:2px;
                color: green;
                font-size: 13px;
                .location-copy{
                    color:#666;
                    cursor:pointer;
                }
            }
            .result-date{
                padding:2px;
                font-size: 13px;
                color: #666;                
            }
        }
        .search-history-block{
            margin: 0 0 0 200px;
            .search-history-con{
                padding:20px;
                border-left: 1px solid #ebebeb;
                // .default{
                //     .search-history-number{
                //         border-radius: 50%;
                //     }
                // }
                // .advanced{
                //     .search-history-number{
                //         border-radius: 0;
                //     }
                // }                
                .search-history-number{
                    display: inline-block;
                    margin:8px;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    background: #c3c3c3;
                    color: #fff;
                    font-weight: bold;
                    &.current-search{
                        background: #409eff;
                    }
                }
            }
        }    
    }

    .pagination-container{
        margin: 32px 0 32px 136px; 
        .el-pagination{
            button{
                span{
                    height: 34px;
                    padding: 0 18px;
                    border: 1px solid #e1e2e3;
                    line-height: 34px; 
                }              
            }
            .number{
                width: 34px;
                height: 34px;
                line-height: 34px;
                border: 1px solid #e1e2e3;
                cursor: pointer; 
                margin:0 5px;
                font-weight: normal;
                &.active{
                    border:none;
                }               
            }
        }
    }

    .result-footer{
        background: #f5f6f5;
        border-top: 1px solid #ebebeb;
        text-align: left;
        height: 42px;
        line-height: 42px;
        margin-top: 40px;
        padding-left: 136px;
        span{
            font-size:12px;
            color: #777;
            padding: 0 15px;
            text-decoration: none;
        }        
    }

    .setting-panel{
        position:fixed;
        background:#fff;
        width:100%;
        z-index:999;
        border-bottom: 1px solid #dfe4ed;
        background-color:#fafafa;
        .close-btn{
            position: absolute;
            top: 14px;
            right: 60px;
            z-index: 1;
            zoom: 1;
            cursor: pointer;
            width: 16px;
            height: 16px;
            float: right;
            color: #d0d0d0;
            margin-top: 7px;
            font-size: 18px;
        }
        .el-tabs__nav-wrap::after {
            height: 1px;
        }        
        .el-tabs__item {
            height: 55px;
            line-height: 55px;
        }
    }

</style>