<template>
  <div>
    <div class="chart-header">
      <div class="chart-title">
        全品类地图
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
    <ve-pie ref="chart" height="600px" :after-set-option="afterSet" :events="chartEvents" :data="chartData" :extend="chartExtend" :settings="chartSettings"></ve-pie>
    <div class="chart-header">
      <div class="chart-title">
        {{ selectedPie  }} 每月 {{ dimension }} 一览图
      </div>
    </div>
    <ve-line height="600px" :data="chartData2" :extend="chartExtend2" :settings="chartSettings2"></ve-line>
  </div>
</template>

<script>
export default {
  props: {
    classdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
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
    chartData: function() {
      var rows = [];
      var key = this.dimensionKey + "Total";
      var columns = ["class", key];
      // var defaultSelected = false;
      for (var d of this.classdata) {
        var rowJson = {
          class: d.largeclass + "-" + d.smallclass
        };
        rowJson[key] = d[key];
        // if (!defaultSelected) {
        //   rowJson["selected"] = true;
        //   defaultSelected = true;
        //   this.selectedPie = rowJson.class;
        // }
        rows.push(rowJson);
      }
      // console.log(columns);
      // console.log(rows);

      // setTimeout(_ => {
      //   this.$refs.chart.echarts.dispatchAction({
      //     type: "pieSelect",
      //     seriesIndex: 0,
      //     dataIndex: 0
      //   });
      // }, 1000);

      return {
        columns: columns,
        rows: rows
      };
    },
    chartData2: function() {
      var rows = [];
      var dimensionKey = this.dimensionKey + "Sum";
      var dimension = this.dimension;
      var columns = ["month", dimension];
      if(this.selectedPie === "全品类" ){
        var tmp = {};
        for (var d of this.classdata) {         
            for (var m in d.data) {
              if(tmp[m] != undefined){
                tmp[m] += d.data[m][dimensionKey];
              }else{
                tmp[m] = d.data[m][dimensionKey];
              }
            }
        }
        // console.log(tmp)
        for(var m in tmp){
          var j = { month: m };
          j[dimension] = tmp[m];
          rows.push(j);
        }
        // console.log(rows);
      }else{
        for (var d of this.classdata) {
          var key = d.largeclass + "-" + d.smallclass;
          if (this.selectedPie === key) {
            for (var m in d.data) {
              var j = { month: m };
              j[dimension] = d.data[m][dimensionKey];
              rows.push(j);
            }
          }
        }        
      }

      return {
        columns: columns,
        rows: rows
      };
    },
    chartExtend2: function() {
      return {
        series: {
          type: "line",
          smooth: false,
          symbol: "rect",
          symbolSize: 8,
          itemStyle: {
            color: this.selectedPieColor
          },
          lineStyle: {
            width: 3
          }
        }
      };
    }
  },
  data() {
    var self = this;
    this.chartEvents = {
      click: function(e) {
        // console.log(e);
        // self.name = e.name;
        if(e.name === self.selectedPie){
          self.selectedPie = "全品类";
          self.selectedPieColor = "#19d4ae";
        }else{
          self.selectedPieColor = e.color;
          self.selectedPie = e.name;
        }

        // console.log(e.name);
      }
    };
    return {
      legendVisable: true,
      chartExtend: {
        title: {
          // text: "品类地图"
        },
        grid: {
          top: 180,
          right: 500
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 60,
          bottom: 60
        },
        series: {
          selectedOffset: 20
        }
      },
      chartSettings: {
        dataType: "KMB",
        selectedMode: "single",
        radius: 200,
        offsetY: 280,
        label: {
          formatter: "{b}: {d}%"
        }
      },
      chartSettings2: {
        yAxisType: ["KMB"]
      },

      dimension: "销量",
      selectedPie: "全品类",
      selectedPieColor: "#19d4ae"
    };
  },
  mounted() {
    // setTimeout(_ => {
    //   this.$refs.chart.echarts.dispatchAction({
    //     type: "pieSelect",
    //     seriesIndex: 0,
    //     dataIndex: 0
    //   });
    // }, 1000);
  },
  methods: {
    chooseDimension(val) {
      this.dimension = val;
    },
    afterSet(echart){
      // echart.dispatchAction({
      //     type: "pieSelect",
      //     seriesIndex: 0,
      //     dataIndex: 0
      //   });
      // console.log(echart);
    }
  }
};
</script>

<style>
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: rgb(136, 136, 136); */
  color: #303133;

}
</style>