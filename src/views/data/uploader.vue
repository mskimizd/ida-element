<template>
  <div class="me-uploader">
    <el-card class="box-card" style="width:360px;">
      <div slot="header" class="clearfix">
        <span>数据上传</span>
      </div>
      <el-form class="upload-form" label-width="80px" label-position="top">
        <el-form-item label="数据类型">
          <el-cascader expand-trigger="hover" :options="dataSourceOptions" v-model="dataSource" @change="handleDataTypeChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="数据文件">
          <el-upload class="upload-demo" drag ref="upload" :action="uploadUri" :before-upload="beforeUpload" :on-error="onError" :on-success="onSuccess" :data="data" :auto-upload="false">
            <span class="el-upload__text">
              <i class="el-icon-upload"></i>
              <span>
                <em>拖拽</em> 或
                <em>点击</em> 上传</span>
            </span>

            <!-- <el-button slot="trigger" size="small" >选取文件</el-button> -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpload">上传到服务器</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="width:360px; margin-top:10px;">
      <div slot="header" class="clearfix">
        <span>上传说明</span>
      </div>
      <div class="upload-tips" >
                  <div class="upload-tip">只能上传 <span class="enhance">xlsx</span>文件，且不超过<span class="enhance">20mb</span></div>
                  <div class="upload-tip">xlsx文件中得数据所在的sheet名字必须为 <span class="enhance">"原始数据"</span> </div>
                  <div class="upload-tip">xlsx中每列格式固定，例如 "月份" 一列统一格式为 "xxxx年xx月"，测试数据中发现过该列格式不统一导致某些月份显示异常  </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Config from "~/config";

export default {
  data() {
    return {
      uploadUri : Config.backend+"/files/upload",
      dataSource: [],
      dataSourceOptions: [
        {
          value: 1,
          label: "全品类数据"
        },
        {
          value: 2,
          label: "竞品数据",
          children: [
            // {
            //   value: 2,
            //   label: "babycare"
            // },
            // {
            //   value: 3,
            //   label: "bobo"
            // },
            // {
            //   value: 4,
            //   label: "Nuk"
            // },
            // {
            //   value: 5,
            //   label: "贝亲"
            // },
            // {
            //   value: 6,
            //   label: "布朗博士"
            // },
            // {
            //   value: 7,
            //   label: "新安怡"
            // }
          ]
        },
        {
          value: 3,
          label: "出库数据",
          children: [
            {
              value: 8,
              label: "京东"
            },          
          ]
        },        
      ]
    };
  },
  computed: {
    data() {
      let d = {
        dataSource: this.dataSource
      };
      return d;
    }
  },
  watch: {
    $route: function() {
      if(this.$route.name==="system-data"){
        this.getDataSourceOpts();
      }
    }
  },  
  mounted(){
    this.getDataSourceOpts();
  },
  methods: {
    onError(err, file, fileList) {
      alert(1);
    },
    onSuccess(response, file, fileList) {
      // console.log(response);
      if (response.code == 200) {
        this.$emit("update-filelist");
      }
    },
    handleDataTypeChange(val) {
      // console.log(val);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file){
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; 
      const isLt20M = file.size / 1024 / 1024 < 20;

        if (!isXLSX) {
          this.$message.error('上传文件只能是 XLSX 格式!');
        }
        if (!isLt20M) {
          this.$message.error('上传文件大小不能超过 20 MB!');
        }
        return isXLSX && isLt20M;
    },
    getDataSourceOpts(){

      // console.log(compstore.state.comps);

      this.dataSourceOptions[1].children = [];
      for(var d of this.$store.state.comps){
        if (parseInt(d.upSrcStatus) == 1) {
          this.dataSourceOptions[1].children.push({
              value: d.upSrcId,
              label:  d.upSrcName,                     
          });
        }
      }

      // this.$http.get(Config.backend+"/system/getComps").then(response => {
      //     response.json().then(res => {
      //         if (res.code == 200) {
      //             this.dataSourceOptions[1].children = [];
      //             for(var d of res.data){
      //               if (parseInt(d.upSrcStatus) == 1) {
      //                 this.dataSourceOptions[1].children.push({
      //                     value: d.upSrcId,
      //                     label:  d.upSrcName,                     
      //                 });
      //               }
      //             }
      //         }
      //     })
      // });
    }
  },
  components: {}
};
</script>

<style lang="less">
.upload-form {
  .el-cascader {
    width: 240px;
  }
  .el-upload-dragger {
    width: 240px;
    height: 40px;
    text-align: left;
    padding: 0 25px 0 15px;
  }
  .el-icon-upload {
    font-size: 18px;
    color: #c0c4cc;
    margin: 0px 4px;
    line-height: initial;
  }
}

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