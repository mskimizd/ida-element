<template>
  <div>
    <div class="chart-header">
      <div class="chart-title">
        TOP10商品各月占比一览图
      </div>
      <div class="chart-filter">
        <el-dropdown trigger="click" @command="chooseDimension">
          <span class="el-dropdown-link">
            {{ dimension }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="销量">销量</el-dropdown-item>
            <el-dropdown-item command="销售额">销售额</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <ve-histogram :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-histogram>
  </div>
</template>

<script>
export default {
  props: {
    rawdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    months: {
      type: Array,
      default: function() {
        return [];
      }
      // required: true
    }
  },
  watch: {
    rawdata(val) {
      var rows = [];
      var columns = ["月份"];
      var monthtmp = {};
      for (var m of this.months) {
        var mjson = {
          月份: m,
          总计: 0
        };
        rows.push(mjson);
        monthtmp[m] = rows.length - 1;
      }
      for (var d of val) {
        var i = columns.indexOf(d.goodstitle);
        var gt = "";
        if (i == -1) {
          gt = d.goodstitle;
        } else {
          gt = d.goodstitle + "-" + i;
        }
        columns.push(gt);
        for (var m in d.data) {
          var ri = monthtmp[m];
          rows[ri][gt] = parseFloat(d.data[m][this.dimensionKey+"Sum"]);
          rows[ri]["总计"] += parseFloat(d.data[m]["monthSaleSum"]);
        }
      }
      for (var i in rows) {
        var row = rows[i];
        for (var key in row) {
          if (key !== "月份" && key !== "总计") {
            rows[i][key] = rows[i][key];
            // rows[i][key] = rows[i][key] / rows[i]["total"];
          }
        }
      }
      columns.push("总计");
      //console.log(columns);
      //console.log(rows);
      this.chartData = {
        columns: columns,
        rows: rows
      };
    }
  },
  computed: {
    dimensionKey: function() {
      var rtn = null;
      if (this.dimension === "销量") {
        rtn = "monthSale";
      } else if (this.dimension === "销售额") {
        rtn = "saleRoom";
      }
      return rtn;
    }, 
    chartSettings: function() {
      var products = [];
      for (var d of this.rawdata) {
        var i = products.indexOf(d.goodstitle);
        if (i == -1) {
          products.push(d.goodstitle);
        } else {
          products.push(d.goodstitle + "-" + i);
        }
      }
      // console.log(products);
      return {
        stack: { 产品: products },
        yAxisType: ["KMB"],
        showLine: ["总计"]
        // max: [1]
      };
    }
  },
  data() {
    return {
      chartData: [],
      legendVisable: true,
      chartExtend: {
        // title: {
        //   text: "TOP10商品各月销量占比一览图"
        // },
        grid: {
          right: 480
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 60,
          bottom: 60
        },
        series: {
          // type: "",
          barMaxWidth: 40,
          smooth:false,
          symbol:"rect",
          symbolSize :8,
          lineStyle :{
            type:"dashed",
            width :3
          }          
        }
      },

      dimension: "销量",
    };
  },
  methods: {
    chooseDimension(val) {
      this.dimension = val;
      if (this.dimension === "销量") {
        this.$emit("change-dimension", "monthSaleTotal");
      } else if (this.dimension === "销售额") {
        this.$emit("change-dimension", "saleRoomTotal");
      }      
    }
  }
};
</script>