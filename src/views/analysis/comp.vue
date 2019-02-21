<template>
  <div>
      <el-card class="box-card" >
        <div style="display:flex;align-items: center;justify-content: space-between; color: #888;">
          <div style="font-size: 24px;font-weight: bold; height:60px;"  >
            <!-- <span>{{ compName.toUpperCase() }} </span> -->
            <img v-if="compName=='drbrowns'" style="height: 100%;background:#1481BD;" v-bind:src="compImages[compName]" />
            <img v-else style="height: 100%;" v-bind:src="compImages[compName]"  />
          </div>
          <div style="line-height: 36px;">
            <span style="margin-right:10px;">总销量</span>
            <span style="color: #303133;margin-right:10px;font-weight: bold;">{{ statsData.monthSaleSum | numberFormat }}</span>
            <span style="margin-right:10px;">总销售额</span>
            <span style="color: #303133;margin-right:10px;font-weight: bold;">{{ statsData.saleRoomSum.toFixed(1) | numberFormat }}</span>
          </div>
          <div>
            <dropdown-select @filter-change="filterMonth" label="月份筛选" :options="monthsList"></dropdown-select>
          </div>
        </div>

      </el-card>
     <div v-if="compHasData">
      <el-card class="box-card" style="margin-top:20px;">
        <month-sale :monthdata="monthSaleGraph"></month-sale>
      </el-card>
      <el-card class="box-card" style="margin-top:20px;">
        <product-sale @change-dimension="changeDimension" :rawdata="goodSaleGraph" :months="months"></product-sale>
      </el-card>
      <!-- <el-card class="box-card" style="margin-top:20px;">
        <product-salex @change-dimension="changeDimension" :rawdata="goodSaleGraph" :months="months"></product-salex>
      </el-card> -->
      <el-card class="box-card" style="margin-top:20px;" v-if="tableShow">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="平台数据" name="platform">
            <!-- <easy-table v-on:limit="limit3" v-on:sort="sort3" :rawdata="rawdata3" :ydata="shoptypes" :months="months3" :fields="fields3"></easy-table> -->
          </el-tab-pane>
          <el-tab-pane label="店铺数据" name="shop">
            <!-- <easy-table v-on:limit="limit1" v-on:sort="sort1" :rawdata="rawdata1" :ydata="shopkeepers" :months="months1" :fields="fields1"></easy-table> -->
          </el-tab-pane>
          <el-tab-pane label="产品数据" name="product">
            <!-- <easy-table v-on:limit="limit2" v-on:sort="sort2" :rawdata="rawdata2" :ydata="goods" :months="months2" :fields="fields2"></easy-table> -->
          </el-tab-pane>
        </el-tabs>
        <easy-table v-on:limit="handleLimit" v-on:sort="handleSort" :rawdata="tableData.rawdata" :ydata="tableData.main" :months="months" :fields="tableData.fields"></easy-table>
      </el-card>
    </div>
    <div v-show="!compHasData">
      无数据
    </div>
  </div>
</template>

<script>
import easytable from "~/components/easytable/two";
import productSale from "~/components/easychart/productSale";
import productSalex from "~/components/easychart/productSalex";
import monthSale from "~/components/easychart/monthSale";
import dropdownSelect from "~/components/dropdown-select";

import Config from "~/config";

import myutil from "~/utils/common.js";

import image_babycare from "~/assets/image/logos/babycare.jpg";
import image_bobo from "~/assets/image/logos/bobo.png";
import image_nuk from "~/assets/image/logos/nuk.jpg";
import image_pigeon from "~/assets/image/logos/pigeon.png";
import image_drbrowns from "~/assets/image/logos/drbrowns.png";
import image_avent from "~/assets/image/logos/avent.jpg";
import image_kubbaby from "~/assets/image/logos/kub.png";
import image_comotomo from "~/assets/image/logos/comotomo.jpg";

export default {
  data() {
    return {
      compName: "",
      compImages:{
        "babycare":image_babycare,
        "bobo":image_bobo,
        "nuk":image_nuk,
        "pigeon":image_pigeon,
        "drbrowns":image_drbrowns,
        "avent":image_avent,
        "kubbaby":image_kubbaby,
        "comotomo":image_comotomo,
      },
      compHasData:false,
      statsData: {
        monthSaleSum: 0,
        saleRoomSum: 0
      },
      months: [], // 选择月份列表
      monthsList: [], // 月份全列表

      monthSaleGraph: [], // 月销量图表数据
      goodSaleGraph: [], // 商品销量图表数据

      tableData: {
        tableName: "platformSale", // platform, shop, goods,
        rawdata: [],
        main: [],
        fields: [
          {
            key: "shoptype",
            name: "平台"
          },
          {
            key: "",
            name: ""
          }
        ],
        cond: {
          key: "saleRoomTotal",
          type: "desc",
          limit: 10
        }
      }, // 表格数据，三类共用

      activeTab: "platform"
    };
  },
  watch: {
    $route: function() {
      if (
        this.$route.matched[0].name == "competitor" &&
        this.$route.name !== "competitor-overview"
      ) {
        this.init();
      }
    }
  },
  computed: {
    tableShow(){
      return this.$store.state.tableShow
    }
  },     
  mounted: function() {
    this.init();
  },
  filters: {
    numberFormat:(value)=>{
      return myutil.numberFormatter(value);
    },  
  },  
  methods: {
    init() {
      this.compName = this.$route.params.param;
      // console.log(this.compName);
      this.getMonths();
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.tableData.tableName = "platformSale";
        this.tableData.fields = [
          {
            key: "shoptype",
            name: "平台"
          },
          {
            key: "",
            name: ""
          }
        ];
        this.getTableData();
      } else if (tab.index == 1) {
        this.tableData.tableName = "shopSale";
        this.tableData.fields = [
          {
            key: "shopkeeper",
            name: "掌柜名称"
          },
          {
            key: "shoptype",
            name: "店铺类型"
          }
        ];
        this.getTableData();
      } else if (tab.index == 2) {
        this.tableData.tableName = "goodSale";
        this.tableData.fields = [
          {
            key: "goodstitle",
            name: "商品标题"
          },
          {
            key: "goodslink",
            name: "商品链接"
          }          
        ];
        this.getTableData();
      }
    },
    handleLimit(num) {
      this.tableData.cond.limit = num;
      this.getTableData();
    },
    handleSort(data) {
      this.tableData.cond.key = data.key;
      this.tableData.cond.type = data.type;
      this.getTableData();
    },
    filterMonth(months) {
      this.months = months;
      // 重新获取数据
      this.getStats();
      this.getMonthSaleGraph();
      this.getGoodSaleGraph("monthSaleTotal");
      this.getTableData();

    },
    changeDimension(dkey) {
      this.getGoodSaleGraph(dkey);
    },
    getMonths() {
      // 初始数据
      this.$http
        .post(Config.backend+"/analysis/month", {
          table: "comp_" + this.compName
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.months = res.data;
                this.monthsList = res.data;

                if(res.data.length>0){
                  // 获取数据
                  this.getStats();
                  this.getMonthSaleGraph();
                  this.getGoodSaleGraph("monthSaleTotal");
                  this.getTableData();
                  this.compHasData = true;
                }else{
                  this.compHasData = false;
                }

                // console.log(this.compHasData);
              }else{
                this.compHasData = false;
              }
            });
          },
          response => {}
        );
    },
    getStats() {
      this.$http
        .post(Config.backend+"/analysis/stats", {
          table: "comp_" + this.compName,
          months: this.months.toString()
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.statsData.monthSaleSum = res.data.monthSaleSum;
                this.statsData.saleRoomSum = res.data.saleRoomSum;
              }
            });
          },
          response => {}
        );
    },
    getMonthSaleGraph() {
      this.$http
        .post(Config.backend+"/analysis/monthSale", {
          table: "comp_" + this.compName,
          months: this.months.toString()
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.monthSaleGraph = res.data;
              }
            });
          },
          response => {}
        );
    },
    getGoodSaleGraph(dkey) {
      this.$http
        .post(Config.backend+"/analysis/goodSale", {
          table: "comp_" + this.compName,
          months: this.months.toString(),
          key: dkey,
          type: "desc",
          limit: 10
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.goodSaleGraph = res.data.rawdata;
              }
            });
          },
          response => {}
        );
    },
    getTableData() {
      var uri = Config.backend + "/analysis/" + this.tableData.tableName;
      this.$http
        .post(uri, {
          table: "comp_" + this.compName,
          months: this.months.toString(),
          key: this.tableData.cond.key,
          type: this.tableData.cond.type,
          limit: this.tableData.cond.limit
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.tableData.rawdata = res.data.rawdata;
                // this.shoptypes = res.data.shoptypes;
                // this.months3 = res.data.months;
              }
            });
          },
          response => {}
        );
    }
  },
  components: {
    "easy-table": easytable,
    "product-sale": productSale,
    "product-salex": productSalex,
    "month-sale": monthSale,
    "dropdown-select": dropdownSelect
  }
};
</script>

<style lang="less">
</style>