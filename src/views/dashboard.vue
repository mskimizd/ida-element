<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card" shadow="never" :body-style="{background:'#409EFF'}">
            <div class="dashboard-card">
              <span>数据总量</span>
              <span>{{ total }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="never"  :body-style="{background:'#67C23A'}">  
            <div class="dashboard-card">
              <span>平台</span>
              <span>{{ platformNum }}</span>            
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="never" :body-style="{background:'#EB9E05'}">
            <div class="dashboard-card">
              <span>竞品</span>
              <span>{{ compsNum }}</span>              
            </div>
          </el-card>
        </el-col>
      </el-row> 
      <el-row style="margin-top:20px;"  :gutter="20"> 
        <el-col :span="16">
          <el-card class="box-card" shadow="never" >
            <div class="chart-title">
              每月数据量走势图
            </div>        
            <ve-line :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-line>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="never" >  
            <ul class="dashboard-list">
              <li v-for="com in comps" v-bind:key="com.upSrcKey">
                <div>
                  <img v-if="com.upSrcKey=='babycare'" src="../assets/image/logos/babycare.jpg" />
                  <img v-if="com.upSrcKey=='bobo'" src="../assets/image/logos/bobo.png" />
                  <img v-if="com.upSrcKey=='nuk'" src="../assets/image/logos/nuk.jpg" />
                  <img v-if="com.upSrcKey=='pigeon'" src="../assets/image/logos/pigeon.png" />
                  <img style="background:#1481BD;" v-if="com.upSrcKey=='drbrowns'" src="../assets/image/logos/drbrowns.png" />
                  <img v-if="com.upSrcKey=='avent'" src="../assets/image/logos/avent.jpg" />
                  <img v-if="com.upSrcKey=='kubbaby'" src="../assets/image/logos/kub.png" />
                  <img v-if="com.upSrcKey=='comotomo'" src="../assets/image/logos/comotomo.jpg" />                 
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>      
      </el-row>               
    </div>
</template>

<script>
  import Config from "~/config";

  export default {
    data() {
      return {
        total:0,
        compsNum:0,
        platformNum:0,
        chartData:[], 
        chartExtend: {
          grid: {
            top: 80
          },    
          series: {
            type: "line",
            smooth: false,
            symbol: "rect",
            symbolSize: 8,
            lineStyle: {
              width: 3
            }
          }
        },
        chartSettings:{
          labelMap: {
            amount: "数据量"
          }            
        },
        comps:[]              
      };
    },
    mounted: function() {
      this.dataAmountTotal();
      this.dataAmountPerMonth();
      this.getComps();
    },
    methods: {
      dataAmountTotal() {
        this.$http
          .post(Config.backend+"/analysis/dataAmountTotal", {})
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.total = res.data.total;
                  this.compsNum = res.data.comps;
                  this.platformNum = res.data.platform;
                }
              });
            },
            response => {}
          );
      },      
      dataAmountPerMonth() {
        this.$http
          .post(Config.backend+"/analysis/dataAmountPerMonth", {})
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.chartData = {
                    columns: ["month", "amount"],
                    rows:res.data.monthdata
                  }
                }
              });
            },
            response => {}
          );
      },
      getComps(){
        this.$http
          .get(Config.backend+"/system/getComps")
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.comps = res.data;
                }
              });
            },
            response => {}
          );        
      }
    },    
  }

</script>

<style lang="less">
  .dashboard-card{
    display:flex;
    justify-content: space-between;
    color:#fff;
    font-size:24px;
    height:80px;
    line-height: 80px;
  }

  .dashboard-list{
    list-style:none;
    margin:0;
    padding:0;
    li{
      display:flex;
      justify-content: center;
    }
    img{
      width:120px;
      margin:4px 0;
    }
  }
</style>