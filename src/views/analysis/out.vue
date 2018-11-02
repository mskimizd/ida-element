<template>
  <div >
      <el-card class="box-card">
        <div style="display:flex;align-items: center;justify-content: space-between; color: #888;">
          <div style="font-size: 24px;font-weight: bold;">
            <span>{{ outname.toUpperCase() }} </span>
          </div>
          <div>
            <el-dropdown trigger="click" style="margin-left:10px;padding:2px 0;" @command="numLimit" >
              <span class="el-dropdown-link">
                前 {{ limitNum }} 产品
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="num in limitNums">
                  <el-dropdown-item :command="num" :key="num"> {{ num }}</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="margin: 0 28px;"></span>          
            <dropdown-select @filter-change="filterPromotion" label="促销筛选" :options="promsList"></dropdown-select>
            <span style="margin: 0 28px;"></span>
            <dropdown-select @filter-change="filterMonth" label="月份筛选" :options="monthsList"></dropdown-select>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top:20px;">
        <good-sale :rawdata="GraphGoodData" :goodcode="GraphGoodCode"></good-sale>
      </el-card>

      <el-card class="box-card" style="margin-top:20px;">
        <class-sale :rawdata="GraphClassData" :goodclass="GraphGoodClass"></class-sale>
      </el-card>

      <el-card class="box-card" style="margin-top:20px;">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="品类数据" name="classdata" >
          </el-tab-pane>
          <el-tab-pane label="产品数据" name="gooddata" >
          </el-tab-pane>
          <easy-table-jd :rawdata="tableData.rawdata" :months="months" :goodclass="tableData.columns" :merge="tableData.mergeRow"></easy-table-jd>
        </el-tabs>
      </el-card>
  </div>
</template>

<script>
import easytablejd from "~/components/easytable/tablejd";
import classSale from "~/components/easychart/classSale";
import goodSale from "~/components/easychart/goodSale";
import dropdownSelect from "~/components/dropdown-select";
import Config from "~/config";

  export default {
    data() {
      return {
        outname:"",
        months: [], // 选择月份列表
        monthsList: [], // 月份全列表 ,
        promotions:[],
        promsList:[],
        
        GraphClassData: [], 
        GraphGoodClass: [],

        GraphGoodData: [], 
        GraphGoodCode: [],        

        tableData:{
          type:"class",
          rawdata:[],
          columns:[], 
          mergeRow:[] // 月份合并
        },

        activeTab: "classdata",
        limitNum: 10,
        limitNums: [10, 20, 50, 9999],

      };
    },
    mounted: function() {
      this.init();
    },    
    methods: {
      init() {
        this.outname = this.$route.name;
        //console.log(this.$route);
        this.getInitData();
      },
      handleClick(tab, event) {
        if (tab.index == 0) {
          this.tableData.type = "class";
          this.getTableData();
        }else if(tab.index == 1){
          this.tableData.type = "good";
          this.getTableData();
        }
      },
      filterMonth(months) {
        this.months = months;
        // 重新获取数据
        this.getTableData();
        this.getClassGraph();
        this.getGoodGraph();
      }, 
      filterPromotion(proms) {
        this.promotions = proms;
        // 重新获取数据
        this.getTableData();
        this.getClassGraph();
        this.getGoodGraph();
      },             
      getInitData() {
        // 初始数据
        this.$http
          .post(Config.backend+"/analysis/outinit", {
            table: this.outname.replace("-","_")
          })
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.months = res.data.month;
                  this.monthsList = res.data.month;
                  this.promotions  = res.data.promotion
                  this.promsList = res.data.promotion;

                  if(res.data.month.length>0){
                    // 获取数据 
                    this.getTableData();
                    this.getClassGraph();
                    this.getGoodGraph();


                  }else{

                  }

                }else{

                }
              });
            },
            response => {}
          );
      },
      getGoodGraph(){
        this.$http
          .post(Config.backend + "/analysis/outjdgood", {
            table: this.outname.replace("-","_"),
            months: this.months.toString(),
            promotions: this.promotions.toString(),
            limit:this.limitNum
          })
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.GraphGoodData = res.data.rawdata;
                  this.GraphGoodCode = res.data.columns;             
                }
              });
            },
            response => {}
          );        
      },
      getClassGraph(){
        this.$http
          .post(Config.backend + "/analysis/outjdclass", {
            table: this.outname.replace("-","_"),
            months: this.months.toString(),
            promotions: this.promotions.toString(),
          })
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.GraphClassData = res.data.rawdata;
                  this.GraphGoodClass = res.data.columns;             
                }
              });
            },
            response => {}
          );
      },
      getTableData() {
        var uri = Config.backend + "/analysis/" + this.outname.replace("-","") + this.tableData.type;
        this.$http
          .post(uri, {
            table: this.outname.replace("-","_"),
            months: this.months.toString(),
            promotions: this.promotions.toString(),
            limit:this.limitNum
          })
          .then(
            response => {
              response.json().then(res => {
                if (res.code == 200) {
                  this.tableData.rawdata = res.data.rawdata;
                  this.tableData.columns = res.data.columns;

                  // 月份显示合并
                  var tmpStr = "";
                  var tmpIndex = 0;
                  var tmplength = 0;
                  this.tableData.mergeRow = [];
                  for (var index in res.data.rawdata) {
                    var cls = res.data.rawdata[index].month;
                    if (cls !== tmpStr) {
                      if (tmplength > 0)
                        this.tableData.mergeRow.push([parseInt(tmpIndex), tmplength]);

                      tmpIndex = index;
                      tmplength = 1;
                      tmpStr = cls;
                    } else {
                      tmplength += 1;
                    }
                  }
                  this.tableData.mergeRow.push([parseInt(tmpIndex), tmplength]);  

                  // console.log(this.tableData.mergeRow);   

                  this.$nextTick(function(){
                    console.log("dom update")
                  })             

                }
              });
            },
            response => {}
          );
      },
      numLimit(num) {
        this.limitNum = num;
        this.getTableData();
        this.getGoodGraph();
      }            
    },
    components: {
      "easy-table-jd": easytablejd,
      "class-sale":classSale,
      "good-sale":goodSale,
      "dropdown-select": dropdownSelect
    }    
  }
</script>

<style lang="less">

</style>