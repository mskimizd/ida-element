<template>
    <el-container>
        <div style="width:360px;position: fixed;">
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span>添加竞品</span>
                </div>
                <el-form ref="form"  :rules="rules" :model="comp" class="upload-form" status-icon label-width="80px" label-position="top">
                    <el-form-item prop="upSrcName" label="竞品名">
                        <el-input v-model="comp.upSrcName"></el-input>
                    </el-form-item>
                    <el-form-item prop="upSrcKey" label="竞品Key">
                        <el-input v-model="comp.upSrcKey"></el-input>
                    </el-form-item>               
                    <el-form-item>
                        <el-button type="primary" @click="addComp('form')">添加</el-button>
                    </el-form-item>
                </el-form>            
            </el-card>
            <el-card class="box-card" style="width:360px; margin-top:10px;">
                <div slot="header" class="clearfix">
                    <span>操作说明</span>
                </div>
                <div class="upload-tips" >
                    <div class="upload-tip">
                        <span>竞品名用于显示。竞品key为竞品唯一ID不可重复</span>
                    </div>                    
                    <div class="upload-tip">
                        <span>不再需要分析的竞品可以选择禁用，页面不再显示该竞品相关数据。</span>
                    </div>
                    <div class="upload-tip">
                        <span>被禁用的竞品数据仍然保存在后台，需要时可以再次开启</span>
                    </div>
                    <div class="upload-tip">
                        <span>如果需要完全删除某个竞品，请联系开发人员。</span>
                    </div>                    
                </div>
            </el-card>            
        </div>
        <el-card class="box-card" style="flex: 1;margin-left: 380px;">
            <div slot="header" class="clearfix">
                <span>数据列表</span>
            </div>
            <el-table :data="comps" stripe>
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="upSrcName" label="竞品名" >
                </el-table-column>
                <el-table-column prop="upSrcKey" label="竞品Key" >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.upSrcStatus == 1" size="mini" type="danger" @click="updateStatus(scope.row,0)">禁用</el-button>
                        <el-button v-if="scope.row.upSrcStatus == 0" size="mini" type="primary" @click="updateStatus(scope.row,1)">启用</el-button>
                        <!-- <el-button size="mini" @click="handleDownload(scope.$index, scope.row)">下载</el-button> -->
                    </template>
                </el-table-column>                
            </el-table>
        </el-card>
</el-container>
</template>

<script>

import Config from "~/config";

export default {
    data() {
        return {
            comps: [],
            comp:{
                upSrcName:"",
                upSrcKey:""
            },
            rules: {
                upSrcName:[
                    { required: true, message: '请输入竞品名', trigger: 'blur' },
                ],
                upSrcKey: [
                    { required: true, message: '请输入竞品Key', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
        this.getAllComps();
    },
    methods: {
        getAllComps: function () {
            this.$http.get(Config.backend+'/system/getComps').then(response => {
                response.json().then(res => {
                    if (res.code == 200) {
                        this.comps = res.data;  
                        
                        var comps = [];
                        for (var d of res.data) {
                            if (parseInt(d.upSrcStatus) == 1) {
                                comps.push(d);
                            }
                        }
                        this.$store.commit('setx', comps);

                    }
                })
            });
        },
        addComp(formName) {
            console.log(this.$refs[formName]);
            this.$refs[formName].validate((valid) => {
                console.log(valid);
                if (valid) {
                    this.$http.post(Config.backend+'/system/addComp',this.comp).then(response => {
                        response.json().then(res => {
                            if (res.code == 200) {
                                // this.comps = res.data;
                                this.getAllComps();
                            }
                        })
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        updateStatus(data,status){
            data.upSrcStatus = status;
            this.$http.post(Config.backend+'/system/delComp',data).then(response => {
                response.json().then(res => {
                    if (res.code == 200) {
                        // this.comps = res.data;
                        this.getAllComps();
                    }
                })
            });
        }            
    },
    components: {

    },
}
</script>

<style lang="less">
.upload-tips{
    font-size:14px;
  .upload-tip{
    padding:6px;
    .enhance{
      font-weight: bold;
      color:#ec0d0d;
      margin: 0 2px;
    }
  }
}
</style>