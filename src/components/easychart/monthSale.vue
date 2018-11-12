<template>
  <div>
    <div class="chart-header">
      <div class="chart-title">
        月销量与月销售一览图
      </div>
    </div>
    <ve-line :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-line>
    <!-- <ve-histogram :extend="chartExtend" height="600px" :data="chartData" :settings="chartSettings"></ve-histogram> -->
  </div>
</template>

<script>
import myutil from "~/utils/common.js";

export default {
  props: {
    monthdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    }
  },
  computed: {
    chartData: function() {
      var rows = this.monthdata;
      var columns = ["month", "monthSaleSum", "saleRoomSum"];
      return {
        columns: columns,
        rows: rows
      };
    },
    chartSettings: function() {
      return {
        axisSite: { right: ["saleRoomSum"] },
        yAxisName: ["销量", "销售额"],
        labelMap: {
          monthSaleSum: "月销量",
          saleRoomSum: "月销售额"
        }
      };
    }
  },
  data() {
    return {
      legendVisable: true,
      chartExtend: {
        grid: {
          top: 80
        },
        tooltip : {
            // trigger: 'item',
            formatter: (value ,index) =>  {
              var str = myutil.monthFormatter(value[0].name) + " <br /> " ;
              for(var v of value){
                str += v.seriesName + ": ";
                str += myutil.numberFormatter(v.value[1]) + " <br /> " ;

              }
              return str;
            }
        },        
        yAxis: {
          axisLabel:{
            formatter: (value ,index) =>  {
              return myutil.numberFormatter(value);
            }
          }
        },
        xAxis: {
          axisLabel:{
            formatter: (value ,index) =>  {
              return myutil.monthFormatter(value);
            }
          }
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
      }
    };
  }
};
</script>


<style lang="less">
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: rgb(136, 136, 136); */
  color: #303133;
}
</style>
