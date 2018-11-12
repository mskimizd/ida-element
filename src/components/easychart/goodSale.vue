<template>
  <div>
    <div class="chart-header">
      <div class="chart-title">
        各产品销量走势图
      </div>
    </div>
     <ve-line height="600px" :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>
  </div>
</template>

<script>
import myutil from "~/utils/common.js";

export default {
  props: {
    rawdata: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    goodcode: {
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
      var columns = ["月份"];
      for(var d of this.rawdata){
          var mjson = {
              月份: d.month
          }
          for(var dk in d.data){
              //var kk = dk+"-"+d.promotion;
              //mjson[kk] = d.data[kk];
              mjson[dk] = d.data[dk];
          }
          rows.push(mjson);          
      }
      for(var gcode of this.goodcode){
          columns.push(gcode);
      }
      //console.log(rows);
      //console.log(columns);
      return {
        columns: columns,
        rows: rows
      };
    },
    chartSettings: function() {
      return {
        yAxisName: ["销量？"],
        // yAxisType: ["KMB"]       
      };
    }
  },
  data() {
    return {
      legendVisable: true,
      chartExtend: {
        grid: {
          right: 140
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
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 60,
          bottom: 60
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