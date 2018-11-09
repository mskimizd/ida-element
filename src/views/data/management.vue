<template>
    <div style="display:flex;">
        <uploader v-on:update-filelist="getAllFiles(1)" style="position:fixed;" />
        <el-card class="box-card" style="margin-left:380px;flex: 1;">
            <div slot="header" class="clearfix">
                <span>数据列表</span>
            </div>
            <el-table :data="files" stripe>
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="upRealname" label="文件名" width="260">
                </el-table-column>
                <el-table-column prop="upSrcName" label="数据类型" width="120">
                </el-table-column>
                <el-table-column prop="upTimestamp" label="上传时间" width="160">
                </el-table-column>
                <el-table-column label="状态" width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.upStatus == 0">待导入</span>
                        <span v-if="scope.row.upStatus == 1">
                            <!-- 正在导入 -->
                            <!-- <fprogress :fid="scope.row.upId" :progress="scope.row.upProgress" ></fprogress> -->
                            <i class="el-icon-loading"></i> 导入中...
                        </span>
                        <span v-if="scope.row.upStatus == 9">
                            导入完成
                        </span>
                        <span v-if="scope.row.upStatus == 8">导入失败</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button :disabled="scope.row.upStatus !=0" size="mini" type="primary" @click="handleImport(scope.$index, scope.row)">导入</el-button>
                        <!-- <el-button size="mini" @click="handleDownload(scope.$index, scope.row)">下载</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;text-align: center;"
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :currentPage.sync="curPage"
              :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import Uploader from "./uploader";
// import Fprogress from "./fprogress";

import Config from "~/config";

export default {
  data() {
    return {
      files: [],
      total:0,
      curPage:1,
      timerTmp: null,
      timmerCount: 0
    };
  },
  mounted: function() {
    this.getAllFiles(1);
  },
  watch: {
    timmerCount: function(val) {
      // 每5秒执行一次查询，超过20次，即100秒后不再查询
      if (val >= 20) {
        clearInterval(this.timerTmp);
      }
    }
  },
  methods: {
    getAllFiles: function(page) {
      this.$http.post(Config.backend+"/files/getUploaded", {page:page}).then(
        response => {
          // console.log(response);
          response.json().then(res => {
            if (res.code == 200) {
              this.files = res.data.rows;
              this.total = res.data.total;
              this.startPolling();
              // console.log(this.files);
            }
          });
          // if (response.body.code == 200) {
          //   return this.$http.post(
          //     Config.backend+"/files/getUploaded",
          //     {}
          //   );
          // }
        },
        response => {
          this.$notify.error({
            title: "错误",
            message: "服务器错误"
          });
        }
      );
      // .then(response => {
      //   console.log(response);
      // });
    },
    handleImport(index, row) {
      let pdata = {
        upPath: row.upPath,
        upId: row.upId,
        upSrcTable: row.upSrcTable,
        upSrcClassKey: row.upSrcClassKey
      };
      this.files[index].upStatus = 1;
      this.$http.post(Config.backend+"/files/import", pdata).then(
        response => {
          response.json().then(res => {
            if (res.code == 200) {
              this.timmerCount = 0;
              clearInterval(this.timerTmp);
              this.startPolling();
            } else {
              this.files[index].upStatus = 8;
            }
          });
        },
        response => {
          this.files[index].upStatus = 8;
          this.$notify.error({
            title: "错误",
            message: "服务器错误"
          });
        }
      );
    },
    getStatus(upIdList) {
      this.$http
        .post(Config.backend+"/files/getStatus", {
          upIdList: upIdList.toString()
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                //(new Date());
                //console.log(res);
                var allFinished = true;
                for (var d of res.data) {
                  if (d.upStatus == 1) {
                    allFinished = false;
                  } else {
                    for (var index in this.files) {
                      if (this.files[index].upId == d.upId) {
                        this.files[index].upStatus = d.upStatus;
                      }
                    }
                  }
                }
                if (allFinished) clearInterval(this.timerTmp);
              } else {
                clearInterval(this.timerTmp);
              }
            });
          },
          response => {
            clearInterval(this.timerTmp);
            this.$notify.error({
              title: "错误",
              message: "服务器错误"
            });
          }
        );
    },
    startPolling() {
      var upIdList = [];
      for (var f of this.files) {
        if (f.upStatus == 1) {
          upIdList.push(f.upId);
        }
      }
      if (upIdList.length > 0) {
        this.timerTmp = setInterval(() => {
          this.timmerCount = this.timmerCount + 1;
          this.getStatus(upIdList);
        }, 5000);
      }
    },
    handleCurrentChange(val){
      this.getAllFiles(val);
      // console.log(`当前页: ${val}`);
    }
  },
  components: {
    uploader: Uploader,
    // fprogress: Fprogress
  }
};
</script>

<style lang="less">
</style>