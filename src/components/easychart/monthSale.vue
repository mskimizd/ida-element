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
        yAxisType: ["KMB", "KMB"],
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
        // title: {
        //   text: "每月销量与销售额一览图"
        // },
        grid: {
          top: 80
        },
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 0,
        //   top: 60,
        //   bottom: 60
        // },
        // series: {
        //   type: "bar",
        //   barMaxWidth: 40
        // }
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
