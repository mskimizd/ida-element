<template>
     <ve-line height="600px" :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>
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
      var rows = [];
      var columns = [];
      if(this.monthdata.length>0){
        for(var md of this.monthdata){
          var comps = Object.keys(md);
          for(var comp of comps){
            if(columns.indexOf(comp) == -1){
              columns.push(comp);
            }
          }
        }        
        rows = this.monthdata;
      //   columns =  Object.keys(rows[0]);
      }
      console.log(columns);
      console.log(rows);
      return {
        columns: columns,
        rows: rows
      };
    },
    chartSettings: function() {
      return {
        yAxisName: ["销售额"],
        // yAxisType: ["KMB"]       
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