<template>
     <ve-line height="600px" :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>
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
      var rows = [];
      var columns = [];
      if(this.monthdata.length>0){
        rows = this.monthdata;
        columns =  Object.keys(rows[0]);
      }
      return {
        columns: columns,
        rows: rows
      };
    },
    chartSettings: function() {
      return {
        yAxisName: ["销售额"],
        yAxisType: ["KMB"]       
      };
    }
  },
  data() {
    return {
      legendVisable: true,
      chartExtend: {
        title: {
          text: "竞品销售额走势图"
        },
        // grid: {
        //   top: 80
        // }
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 0,
        //   top: 60,
        //   bottom: 60
        // },
        series: {
          type: "line",
          smooth:false,
          symbol:"rect",
          symbolSize :8,
          lineStyle :{
            width :3
          }
        }
      }
    };
  }
};
</script>